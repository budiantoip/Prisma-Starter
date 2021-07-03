import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class App {
    public async main(): Promise<void> {
        let create_user = await prisma.user.create({
            data: { username: "Harper Lee", email: "Harper@lee.com" },
        });

        console.log(`Query Result : ${JSON.stringify(create_user)}`);

        const create_multiple_posts = await prisma.post.createMany({
            data: [
                {
                    title: "To kill a mocking bird",

                    content: "Hit it with a rock",

                    authorId: 1,
                },

                {
                    title: " Go Set a Watchman ",

                    content: "Working on it",

                    authorId: 1,
                },
            ],
        });

        console.log(`Query Result : ${JSON.stringify(create_multiple_posts)}`);

        const create_user_with_posts = await prisma.user.create({
            data: {
                username: "Dan Brown",

                email: "dan@brown.com",

                posts: {
                    create: {
                        title: "The da vinci code",

                        content: "Need some refactoring",
                    },
                },
            },
        });

        console.log(`Query Result : ${JSON.stringify(create_user_with_posts)}`);

        const get_all_users = await prisma.user.findMany();

        console.log(`Query Result : ${JSON.stringify(get_all_users)}`);

        const get_user_by_email = await prisma.user.findUnique({
            where: { email: "dan@brown.com" },

            select: { username: true, posts: { select: { title: true } } },
        });

        console.log(`Query Result : ${JSON.stringify(get_user_by_email)}`);
    }
}

export default App;