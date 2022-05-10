const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todos = require("./models/todosSchema");
const theme = require("./models/themeSchema");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb://127.0.0.1:27017/testDB`, { useNewUrlParser: true, useUnifiedTopology: true }).then(mon => {
    console.log(`Connected to the database!`);
}).catch((err) => {
    console.log("Unable to connect to the Mongodb database. Error:" + err, "error");
});

app.post('/updateTodos', async (req, res) => {
    let bdy = req.body;
    if (bdy.change == "delete") {
        let matchTitle = await todos.findOne({ title: bdy.stuff.title });
        if (matchTitle) {
            todos.findOneAndDelete({ title: bdy.stuff.title }, (err, res) => {
                if (err) console.log(err);
            })
        }
    }
})

//Routes
app.post('/todos', async (req, res) => {
    const { title, desc } = req.body;
    let matchTitle = await todos.findOne({ title: title });
    if (matchTitle) {
        res.send({ message: "Task already exists" });
    }
    else {
        let sno = await (await todos.find({})).length;
        if(sno == null) sno = 1;
        else sno = sno + 1;
        let todo = new todos({
            sno: sno,
            title: title,
            description: desc
        })
        await todo.save(err => {
            if (err) {
                res.send(err);
            } else {
                res.send({ message: "Success" });
            }
        });
    }

})

app.post('/theme', async (req, res) => {
    const { settheme, style } = req.body;
    let findTheme = await theme.findOne({});
    if (!findTheme || findTheme == null) {
        let th = new theme({
            theme: settheme,
            currentStyle: style
        })
        await th.save(err => {
            if (err) {
                res.send(err);
            }
        });
    } else {
        await theme.findOneAndUpdate({}, { theme: settheme, currentStyle: style }, { useFindAndModify: false });
    }
})

app.get('/getTodos', async (req, res) => {
    return await todos.find({}).then((err, result) => {
        if (err) res.json(err);
        else res.json(result);
    });
})

app.get('/getTheme', async (req, res) => {
    return await theme.find({}).then((err, result) => {
        if (err) res.json(err);
        else res.json(result);
    });
})

app.listen(5000, () => {
    console.log("APP IS LISTENING TO PORT 5000");
})