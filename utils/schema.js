import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"; // ✅ Only PostgreSQL imports

export const MockAiInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', { length: 255 }).notNull(), // ✅ Length defined
    jobDesc: varchar('jobDesc', { length: 500 }).notNull(), // ✅ Increased for description
    jobExperience: varchar('jobExperience', { length: 50 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 100 }).notNull(),
    mockId: varchar('mockId', { length: 100 }).notNull()
});

export const UserAnswer = pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId', { length: 100 }).notNull(),
    question:varchar('question').notNull(),
    correctAns:varchar('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})  
