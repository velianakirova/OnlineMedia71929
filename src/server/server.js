const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connectDb = require("./dbconnection/DBConnection.js");
const app = express();
const cors = require('cors');
const User = require("./models/UserSchema.js");
const Article = require("./models/ArticleSchema.js");
const Group = require("./models/GroupSchema.js");


const privateKey = "secret-key";
const generateToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, privateKey, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    methods: "GET, PUT, PATCH, DELETE, POST"
}));

app.use(express.json());

connectDb()
    .then(() => {
        console.log('Database connection successful');

        app.listen(3002, () => {
            console.log(`Server is listening on port 3002`);
        });
    })
    .catch((error) => console.error(`Database connection error: ${error}`));

app.post("/api/register", async (req, res) => {
    const { name, username, email, password, gender, role, picture } = req.body;
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res
            .status(409)
            .json({ error: "Conflict. User with this username already exists." });
    }

    let mediumRegex = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    let strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    let emailRegex = new RegExp("[^s@]+@[^s@]+.[^s@]+");

    if (
        (mediumRegex.test(password) === false) &
        (strongRegex.test(password) === false)
    ) {
        return res.status(400).send("Weak password");
    }

    if (emailRegex.test(email) === false) {
        return res.status(400).send("Invalid email");
    }

    if (['admin', 'journalist', 'reader', 'editor'].includes(role) === false) {
        return res.status(400).send("Invalid role");
    }

    if (["male", "female"].includes(gender) === false) {
        return res.status(400).send("Invalid gender");
    }

    try {

    const hashedPassword = await bcrypt.hash(password, 10);

    let today = new Date().toLocaleString();

    const user = new User({
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        role,
        picture,
        created: today,
        lastModified: today,
        writtenArticles: [],
        savedAsticles: []
    });

        await user.save();
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username) return res.status(401).json({ error: "Invalid username." });

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).send({ error: "User not found." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    const token = await generateToken(user._id);
    res.send({ token, user });
  } else {
    res.status(401).send({ error: "Wrong password." });
  }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/users/:username", async (req, res) => {
  
    try {
        let username = req.params.username;
        const users = await (await User.find({})).filter(user => user.username == username);
        res.send(users);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const users = (await User.find({})).filter(user => user._id == id);

        res.send(users);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    const user = (await User.find({})).filter(user => user._id == id);

    if (user.length == 0) {
        return res.status(404).send("Entity not found.");
    }

    if (!id) {
        return res.status(400).json({ error: "Invalid id." });
    }

    await User.deleteOne({ '_id': id });

    const deletedUser = await (await User.find({})).filter(user => user._id == id);
    if (deletedUser.length != 0) {
        return res.status(400).send("Not deleted.");
    }

    return res.status(204).send();
})

app.get("/api/journalists", async (req, res) => {
    try {
        const users = await User.find({}).where('role').equals('journalist');
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/journalists/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const users = (await User.find({}).where('role').equals('journalist')).filter(user => user._id == id);
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/readers", async (req, res) => {
    try {
        const users = await User.find({}).where('role').equals('reader');
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/readers/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const users = (await User.find({}).where('role').equals('reader')).filter(user => user._id == id);
        res.send(users);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/readers/:id/articles/saved", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const userSavedArticles = (await User.find({}).where('role').equals('reader')).filter(user => user._id == id)[0].savedArticles;
        res.send(userSavedArticles);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.post("/api/readers/:id/articles/saved", async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {

        const existingArticle = await Article.findOne({ title });
        if (!existingArticle) {
            return res
                .status(400)
                .json({ error: "Article with this title cannot be found." });
        }

        const userToUpdate = (await User.find({})).filter(user => user._id == id);

        const updatedArticles = userToUpdate[0].savedArticles
        updatedArticles.push(existingArticle);

        const filter = { '_id': id };
        const update = {
            'savedArticles': updatedArticles
        };

        const updatedUser = await User.findOneAndUpdate(filter, update, {
            new: true
        });

        res.status(201).send(updatedUser);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/readers/:id/articles/written", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const userWrittenArticles = (await User.find({}).where('role').equals('reader')).filter(user => user._id == id)[0].writtenArticles;
        res.send(userWrittenArticles);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/api/readers/:id/articles/written", async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {

        const existingArticle = await Article.findOne({ title });
        if (!existingArticle) {
            return res
                .status(400)
                .json({ error: "Article with this title cannot be found." });
        }

        const userToUpdate = (await User.find({})).filter(user => user._id == id);

        const updatedArticles = userToUpdate[0].writtenArticles
        updatedArticles.push(existingArticle);

        const filter = { '_id': id };
        const update = {
            'writtenArticles': updatedArticles
        };

        const updatedUser = await User.findOneAndUpdate(filter, update, {
            new: true
        });

        res.status(201).send(updatedUser);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/editors", async (req, res) => {

    try {
        const users = await User.find({}).where('role').equals('editor');
        res.send(users);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/editors/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const users = (await User.find({}).where('role').equals('editor')).filter(user => user._id == id);
        res.send(users);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/articles", async (req, res) => {
    try {
        const articles = await Article.find({});
        res.send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/articles/published", async (req, res) => {
    try {
        const articles = await (await Article.find({})).filter(article => article.status == "published");
        res.send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/articles/pending", async (req, res) => {
    try {
        const articles = await (await Article.find({})).filter(article => article.status == "pending");
        res.send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/api/articles", async (req, res) => {


    const { userId, groupId, title, shortDescription, picture, longDescription } = req.body;

    const existingArticle = await Article.findOne({ title });
    if (existingArticle) {
        return res
            .status(409)
            .json({ error: "Conflict. Article with this title already exists." });
    }

    let today = new Date().toLocaleString();

    const article = new Article({
        userId,
        groupId,
        title,
        shortDescription,
        picture,
        longDescription,
        comments: [],
        likes: 0,
        status: "pending",
        created: today,
        lastModified: today
    });

    const userToUpdate = (await User.find({})).filter(user => user._id == userId);

    const updatedArticles = userToUpdate[0].writtenArticles
    updatedArticles.push(article);

    const filter = { '_id': userId };
    const update = {
        'writtenArticles': updatedArticles
    };

    await User.findOneAndUpdate(filter, update, {
        new: true
    });

    const groupToUpdate = (await Group.find({})).filter(group => group._id == groupId);

    const updatedGroupArticles = groupToUpdate[0].articles
    updatedGroupArticles.push(article);

    const filterGroup = { '_id': groupId };
    const updateGroup = {
        'articles': updatedGroupArticles
    };

    await Group.findOneAndUpdate(filterGroup, updateGroup, {
        new: true
    });

    await article.save();
    try {

        res.status(201).send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/api/articles/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const articles = (await Article.find({})).filter(article => article._id == id);
        res.send(articles);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.patch("/api/articles/:id/comments", async (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }
    
    try {
        const articles = (await Article.find({})).filter(article => article._id == id);

        const updatedArticleComments = articles[0].comments;
        updatedArticleComments.push(comment);

        const filter = { '_id': id };
        const update = {
            'comments': updatedArticleComments
        };

        await Article.findOneAndUpdate(filter, update, {
            new: true
        });
      
        res.send(articles);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.put("/api/articles/:id", async (req, res) => {
    const id = req.params.id;
    const { title, picture, longDescription, shortDescription } = req.body;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }
  
    try {
        const articles = (await Article.find({})).filter(article => article._id == id);

        const filter = { '_id': id };
        const update = {
            'title': title,
            'picture': picture,
            'longDescription': longDescription,
            'shortDescription': shortDescription
        };

        await Article.findOneAndUpdate(filter, update, {
            new: true
        });
     
        res.send(200);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/articles/:id/comments", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const articleComments = (await Article.find({})).filter(article => article._id == id).comments;
        res.send(articleComments);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/articles/:id/likes", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const articleLikes = (await Article.find({})).filter(article => article._id == id)[0].likes;
        res.send("" + articleLikes);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.post("/api/articles/:id/like", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

        const articles = (await Article.find({})).filter(article => article._id == id);

        let articleLikes = articles[0].likes;
        articleLikes++;

        const filter = { '_id': id };
        const update = {
            'likes': articleLikes
        };

        await Article.findOneAndUpdate(filter, update, {
            new: true
        });
        try {

        res.send(articles[0]);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.patch("/api/articles/:id/like", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

        const articles = (await Article.find({})).filter(article => article._id == id);

        let articleLikes = articles[0].likes;
        articleLikes++;

        const filter = { '_id': id };
        const update = {
            'likes': articleLikes
        };

        await Article.findOneAndUpdate(filter, update, {
            new: true
        });
        try {

        res.send(articles[0]);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.patch("/api/articles/:id/publish", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

        const filter = { '_id': id };
        const update = {
            'status': 'published'
        };

        await Article.findOneAndUpdate(filter, update, {
            new: true
        });
        try {

        res.send(200);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.post("/api/articles/:id/publish", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

        const filter = { '_id': id };
        const update = {
            'status': 'published'
        };

        await Article.findOneAndUpdate(filter, update, {
            new: true
        });
        try {

        res.send(200);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete("/api/articles/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    const articles = (await Article.find({})).filter(article => article._id == id);

    const userToUpdate = (await User.find({})).filter(user => user._id == articles[0].userId);
    const updatedArticles = userToUpdate[0].writtenArticles.filter(article => article.title != articles[0].title);

    const filter = { '_id': articles[0].userId };
    const update = {
        'writtenArticles': updatedArticles
    };

    await User.findOneAndUpdate(filter, update, {
        new: true
    });

    const groupToUpdate = (await Group.find({})).filter(group => group._id == articles[0].groupId);
    const updatedGroupArticles = groupToUpdate[0].articles.filter(article => article.title != articles[0].title);

    const filterGroup = { '_id': articles[0].groupId };
    const updateGroup = {
        'articles': updatedArticles
    };

    await Group.findOneAndUpdate(filterGroup, updateGroup, {
        new: true
    });

    await Article.deleteOne({ '_id': id });

    try {
        res.status(204).send("Deleted");
    } catch (error) {
        res.status(500).send(error);
    }
})


app.post("/api/groups", async (req, res) => {

    try {
        const { name } = req.body;

        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res
                .status(409)
                .json({ error: "Conflict. Group with this name already exists." });
        }

        let today = new Date().toLocaleString();

        const group = new Group({
            name,
            articles: [],
            created: today,
            lastModified: today
        });

        await group.save();
        res.status(201).send(group);

    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("/api/groups", async (req, res) => {

    try {
        const groups = await Group.find({});
        res.send(groups);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/api/groups/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    try {
        const groups = (await Group.find({})).filter(group => group._id == id);
        res.send(groups);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.delete("/api/groups/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return response.status(400).json({ error: "Invalid id." });
    }

    const groups = (await Group.find({})).filter(group => group._id == id);
    if (groups.length === 0) {
        return response.status(400).json({ error: "Group with such id does not exist." });
    }

    try {
        await Group.deleteOne({ '_id': id });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error);
    }
})