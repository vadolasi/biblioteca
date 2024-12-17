import { Elysia, t } from "elysia";
import db from "./db";
import { loansTable, readersTable, usersTable } from "./schema";
import { and, eq, isNull, lt } from "drizzle-orm";
import cron from "@elysiajs/cron";
import { Resend } from "resend";
import { createSigner, createVerifier } from "fast-jwt";
import { HTTPError } from "./error";
import { Packr } from "msgpackr"

// @ts-ignore
const resend = new Resend(process.env.RESEND_API_KEY);

// @ts-ignore
const signer = createSigner({ key: async () => process.env.JWT_SECRET });
// @ts-ignore
const verifier = createVerifier({ key: async () => process.env.JWT_SECRET });

const app = new Elysia({
  prefix: "/api",
  cookie: {
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  },
})
  .decorate("msgpack", new Packr({ moreTypes: true }))
  // @ts-ignore
  .onParse(async ({ request, msgpack }, contentType) => {
    if (contentType === "application/x-msgpack") {
      return msgpack.unpack(Buffer.from(await request.arrayBuffer()));
    }
  })
  // @ts-ignore
  .mapResponse(({ response, set, msgpack }) => {
    if (response && typeof response === "object") {
      set.headers["content-type"] = "application/x-msgpack";
      set.headers["content-encoding"] = "gzip";

      return Bun.gzipSync(msgpack.pack(response), { level: 9 });
    }

    set.headers["content-type"] = "text/plain; charset=utf-8";

    return response;
  })
  // @ts-ignore
  .use(
    cron({
      name: 'late-loans',
      pattern: '* * * * *',
      async run() {
        const loans = await db.query.loansTable.findMany({
          where: (_, { and, isNull, lt, eq }) => and(
            isNull(loansTable.returnedDate),
            lt(loansTable.estimatedReturnDate, new Date(Date.now() + 86400000)),
            eq(loansTable.notified, false)
          ),
          with: {
            reader: true,
            book: true,
          }
        });

        if (loans.length > 0) {
          const users = await db.query.usersTable.findMany();
          const usersEmails = users.map(user => user.email);

          for (const loan of loans) {
            await resend.emails.send({
              from: "vitor036daniel@gmail.com",
              to: usersEmails,
              subject: "Prazo de devolução expirando",
              text: `O prazo de devolução do livro "${loan.book.title}", emprestado para ${loan.reader.name}, em ${new Date(loan.date).toLocaleDateString()} está expirando.`
            });
          }

          await db.update(loansTable).set({ notified: true }).where(and(
            isNull(loansTable.returnedDate),
            lt(loansTable.estimatedReturnDate, new Date(Date.now() - 86400000)),
            eq(loansTable.notified, false)
          )).execute();
        }
      }
    })
  )
  // @ts-ignore
  .error({ HTTPError })
  // @ts-ignore
  .onError(({ code, error, set }) => {
    if (code === "HTTPError") {
      set.status = error.status;
    }

    return error.message;
  })
  // @ts-ignore
  .post("/login", async ({ body: { email, password }, cookie: { token } }) => {
    const user = await db.query.usersTable.findFirst({
      where: (_, { eq }) => eq(usersTable.email, email)
    });

    if (user && await Bun.password.verify(password, user.password)) {
      token.value = await signer({ sub: user.id });;
    } else {
      return { error: "Credenciais inválidas" };
    }
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    })
  })
  .guard({
    // @ts-ignore
    beforeHandle: async ({ cookie: { token } }) => {
      try {
        // @ts-ignore
        await verifier(token.value);
      } catch {
        throw new HTTPError(401, "Unauthorized");
      }
    }
  // @ts-ignore
  }, app =>
    app
      .get("/books", async () => {
        const books = await db.query.booksTable.findMany({ with: { loans: true } });

        return books?.map(book => ({
          ...book,
          available: book.loans.filter(loan => !loan.returnedDate).length === 0
        }));
      })
      // @ts-ignore
      .get("/books/:id", async ({ params: { id } }) => {
        // @ts-ignore
        const book = await db.query.booksTable.findFirst({ where: (_, { eq }) => eq(booksTable, id), with: { loans: true } });

        if (!book) {
          throw new HTTPError(404, "Livro não encontrado");
        }

        return {
          ...book,
          available: book.loans.filter(loan => !loan.returnedDate).length === 0
        };
      }, {
        params: t.Object({
          id: t.Number(),
        })
      })
      .get("/readers", () => {
        return db.query.readersTable.findMany();
      })
      // @ts-ignore
      .get("/readers/:id", ({ params: { id } }) => {
        return db.query.readersTable.findFirst({ where: (_, { eq }) => eq(readersTable, id) });
      }, {
        params: t.Object({
          id: t.Number(),
        })
      })
      // @ts-ignore
      .post("/readers", async ({ body, set }) => {
        try {
          db.insert(readersTable).values(body).execute();
        } catch {
          set.status = 500;
          return { error: "Erro ao adicionar leitor" };
        }
      }, {
        body: t.Object({
          name: t.String(),
          picture: t.String(),
        })
      })
      // @ts-ignore
      .delete("/readers/:id", ({ params: { id } }) => {
        // @ts-ignore
        return db.delete(readersTable).where(eq(readersTable.id, id)).execute();
      }, {
        params: t.Object({
          id: t.Number(),
        })
      })
      .get("/loans", () => {
        return db.query.loansTable.findMany({ with: { book: true, reader: true }, where: (_, { isNull }) => isNull(loansTable.returnedDate) });
      })
      // @ts-ignore
      .get("/loans/:id", ({ params: { id } }) => {
        return db.query.loansTable.findFirst({ where: (_, { eq }) => eq(loansTable, id), with: { book: true, reader: true } });
      }, {
        params: t.Object({
          id: t.Number(),
        })
      })
      // @ts-ignore
      .post("/loans", async ({ body: { readerId, bookId, estimatedReturnDate } }) => {
        db.insert(loansTable).values({ bookId, readerId, date: new Date(), estimatedReturnDate: new Date(estimatedReturnDate) }).execute();
        return { message: "Empréstimo adicionado" };
      }, {
        body: t.Object({
          readerId: t.Number(),
          bookId: t.Number(),
          estimatedReturnDate: t.Number(),
        })
      })
      // @ts-ignore
      .post("/loans/:id/return", async ({ params: { id } }) => {
        await db.update(loansTable).set({ returnedDate: new Date() }).where(eq(loansTable.id, id)).execute();
        return { message: "Livro devolvido" };
      }, {
        params: t.Object({
          id: t.Number(),
        })
      })
  )
  .listen(3000);

export type App = typeof app;
