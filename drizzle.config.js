// import { defineConfig } from "drizzle-kit";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env.local" });

// export default defineConfig({
//   out: "./drizzle",
//   dialect: "postgresql",
//   schema: "./utils/schema.js",

//   driver: "pglite",
//   dbCredentials: {
//     url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
//   },

//   extensionsFilters: ["postgis"],
//   schemaFilter: "public",
//   tablesFilter: "*",

//   introspect: {
//     casing: "camel",
//   },

//   migrations: {
//     prefix: "timestamp",
//     table: "__drizzle_migrations__",
//     schema: "public",
//   },

//   entities: {
//     roles: {
//       provider: '',
//       exclude: [],
//       include: []
//     }
//   },

//   breakpoints: true,
//   strict: true,
//   verbose: true,
// });


/** @type {import ("drizzle-kit").Config} */

export default {
    schema: "./utils/schema.js", // Ensure file exists
    dialect: "postgresql",
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_KolT0Ab1SEnB@ep-restless-frost-a5yuj0tw-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require', 
    },
  };
  