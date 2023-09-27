"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "courses",
      [
        {
          course_id: "1",
          course_name: "PHP for Beginners",
          course_description:
            "Learn the basics of PHP and build dynamic websites.",
          course_category: "beginners",
          course_difficulty: "Beginner",
          total_experience: 100,
          total_levels: 10,
          course_material: `{
          "1": {"title": "Introduction to PHP", "content": "Welcome, young coder! You're about to embark on a journey through the magical world of PHP. PHP stands for 'Hypertext Preprocessor' and it's a server-side scripting language mainly used for web development. It's widely used and powers many of the websites you visit daily. It's versatile, easy to get started with, and has a large community."},
          
          "2": {"title": "History of PHP", "content": "PHP was conceived sometime in the fall of 1994 by Rasmus Lerdorf. Early non-released versions were used on his home page to keep track of who was looking at his online resume. The first version used by others was available sometime in early 1995 and was known as the Personal Home Page Tools. Over the years, PHP has evolved and is now a full-fledged programming language."},
          
          "3": {"title": "How to Comment in PHP", "content": "Comments are like the footnotes of your code. They help you and others understand what's going on. In PHP, you can make single-line comments with // and multi-line comments with /* */. Comments are not executed, so they won't affect your program's output. They're essential for code readability."},
          
          "4": {"title": "What are Variables and Their Scope", "content": "Variables are like containers that store data. In PHP, a variable starts with the '$' symbol. The scope of a variable defines where it can be accessed. Variables can have local, global, or static scope. Understanding variable scope is crucial for effective PHP programming."},
          
          "5": {"title": "How to Echo and Print in PHP", "content": "The 'echo' and 'print' statements are used to output data. While they're similar, 'echo' is a bit faster and can take multiple parameters. Both are essential for sending data back to the browser or writing data into a file."},
          
          "6": {"title": "About Datatypes", "content": "In PHP, data can be of various types like integers, floats, strings, arrays, and more. Knowing the type of data you're dealing with is crucial for effective programming. PHP is a loosely typed language, which means you don't have to declare the type of a variable when you create it."},
          
          "7": {"title": "Control Statements", "content": "Control statements like 'if', 'else', and 'switch' help you make decisions in your code. They're like the crossroads in your coding journey where you decide which path to take. These statements evaluate conditions and execute different blocks of code based on those conditions."},
          
          "8": {"title": "Loops", "content": "Loops are the magic circles of PHP. They let you perform tasks repeatedly without having to write the same code over and over. You have 'for', 'while', and 'do-while' loops at your disposal. Loops are essential for tasks like iterating through arrays or running a block of code until a condition is met."},
          
          "9": {"title": "Operators", "content": "Operators are the magic wands of PHP. They let you perform operations like addition, subtraction, and even string concatenation. Operators are symbols that tell the PHP processor to perform specific mathematical or logical manipulations."},
          
          "10": {"title": "Functions", "content": "Functions are like your magic spells. You can write a block of code and call it whenever you need it. PHP has many built-in functions, and you can also create your own. Functions help in code reusability and can take parameters and return values."}
        }`,
          quizzes: `{
          "1": {
            "title": "What does PHP stand for?",
            "type": "checkbox",
            "answer": "Pretty Hot Programmer, Hypertext Preprocessor, Programming Protocol",
            "correct_answer": "Hypertext Preprocessor"
          },
          "2": {
            "title": "When was PHP conceived?",
            "type": "checkbox",
            "answer": "1990, 1994, 2000",
            "correct_answer": "1994"
          },
          "3": {
            "title": "How do you write a single-line comment in PHP?",
            "type": "checkbox",
            "answer": "//, /*, --",
            "correct_answer": "//"
          },
          "4": {
            "title": "Which of the following is a correct variable in PHP?",
            "type": "checkbox",
            "answer": "var name, int x, $myVar",
            "correct_answer": "$myVar"
          },
          "5": {
            "title": "Which is faster in PHP?",
            "type": "checkbox",
            "answer": "echo, print",
            "correct_answer": "echo"
          },
          "6": {
            "title": "Which of the following is NOT a PHP datatype?",
            "type": "checkbox",
            "answer": "Integer, Float, Unicorn",
            "correct_answer": "Unicorn"
          },
          "7": {
            "title": "Which control statement is used to make decisions?",
            "type": "checkbox",
            "answer": "if, for, echo",
            "correct_answer": "if"
          },
          "8": {
            "title": "Which loop is NOT in PHP?",
            "type": "checkbox",
            "answer": "for, while, repeat",
            "correct_answer": "repeat"
          },
          "9": {
            "title": "What does the '.' operator do in PHP?",
            "type": "checkbox",
            "answer": "addition, subtraction, string concatenation",
            "correct_answer": "string concatenation"
          },
          "10": {
            "title": "What does a PHP function do?",
            "type": "checkbox",
            "answer": "Calculates, Repeats code, Both",
            "correct_answer": "Both"
          }
        }`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          course_id: "2",
          course_name: "HTML for Beginners",
          course_description:
            "Learn the basics of HTML and kickstart your journey in web development.",
          course_category: "beginners",
          course_difficulty: "Beginner",
          total_experience: 100,
          total_levels: 10,
          course_material: `{
          "1": {"title": "Introduction to HTML", "content": "HTML stands for HyperText Markup Language. It's the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages like JavaScript."},
          
          "2": {"title": "HTML Elements", "content": "An HTML element is defined by a start tag, some content, and an end tag. The HTML element is everything from the start tag to the end tag. Elements can also have attributes that look like this: <tagname attribute1='value1' attribute2='value'>."},
          
          "3": {"title": "HTML Attributes", "content": "HTML attributes provide additional information about elements. They are always specified in the opening tag and usually come in name/value pairs like this: name='value'."},
          
          "4": {"title": "HTML Headings", "content": "HTML headings are defined with the <h1> to <h6> tags. <h1> defines the most important heading, while <h6> defines the least important heading."},
          
          "5": {"title": "HTML Links", "content": "HTML links are defined with the <a> tag. The link address is specified in the href attribute."},
          
          "6": {"title": "HTML Lists", "content": "HTML supports ordered, unordered, and definition lists. Ordered lists start with the <ol> tag and each list item starts with the <li> tag."},
          
          "7": {"title": "HTML Forms", "content": "HTML forms are used to collect user input. The <form> element defines an HTML form."},
          
          "8": {"title": "HTML Tables", "content": "HTML tables are defined with the <table> tag. A table is divided into rows with the <tr> tag, and each row is divided into cells with the <td> tag."},
          
          "9": {"title": "HTML Semantics", "content": "Semantic elements clearly describe their meaning in a human- and machine-readable way. Elements like <header>, <footer>, and <article> are all considered semantic elements."},
          
          "10": {"title": "HTML5 Features", "content": "HTML5 brought a set of new elements and attributes for modern web design. It includes multimedia elements like <video> and <audio>, graphical content like <canvas>, and many others."}
        }`,
          quizzes: `{
          "1": {
            "title": "What does HTML stand for?",
            "type": "checkbox",
            "answer": "Hyper Transfer Markup Language, HyperText Markup Language, High-Level Text Markup Language",
            "correct_answer": "HyperText Markup Language"
          },
          "2": {
            "title": "Which of the following is a correct HTML element?",
            "type": "checkbox",
            "answer": "<html>, <htl>, <hmtl>",
            "correct_answer": "<html>"
          },
          "3": {
            "title": "Which attribute is used to create links?",
            "type": "checkbox",
            "answer": "src, href, rel",
            "correct_answer": "href"
          },
          "4": {
            "title": "Which tag is used for the largest heading?",
            "type": "checkbox",
            "answer": "<h1>, <h6>, <head>",
            "correct_answer": "<h1>"
          },
          "5": {
            "title": "Which tag is used for a line break?",
            "type": "checkbox",
            "answer": "<br>, <lb>, <break>",
            "correct_answer": "<br>"
          },
          "6": {
            "title": "Which of the following is NOT a type of HTML list?",
            "type": "checkbox",
            "answer": "Ordered, Unordered, Random",
            "correct_answer": "Random"
          },
          "7": {
            "title": "Which tag is used to create an HTML form?",
            "type": "checkbox",
            "answer": "<form>, <input>, <textfield>",
            "correct_answer": "<form>"
          },
          "8": {
            "title": "Which tag is used for table rows?",
            "type": "checkbox",
            "answer": "<tr>, <td>, <row>",
            "correct_answer": "<tr>"
          },
          "9": {
            "title": "Which of the following is a semantic element?",
            "type": "checkbox",
            "answer": "<div>, <span>, <article>",
            "correct_answer": "<article>"},
          "10": {
            "title": "Which HTML5 element is used for video playback?",
            "type": "checkbox",
            "answer": "<media>, <video>, <play>",
            "correct_answer": "<video>"
          }
        }`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          course_id: "3",
          course_name: "Java for Beginners",
          course_description:
            "Learn the fundamentals of Java and become a proficient developer",
          course_category: "beginners",
          course_difficulty: "Beginner",
          total_experience: 100,
          total_levels: 10,
          course_material: `{
          "1": {"title": "Introduction to Java", "content": "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible."},
          
          "2": {"title": "Java Syntax", "content": "Java syntax is the set of rules defining how a Java program is written and interpreted. The syntax is mostly derived from C and C++."},
          
          "3": {"title": "Data Types and Variables", "content": "Java has several data types to represent numbers, characters, and other values. Variables are used to store these data."},
          
          "4": {"title": "Operators in Java", "content": "Java provides a rich set of operators to manipulate variables. These include arithmetic, relational, and logical operators."},
          
          "5": {"title": "Control Flow Statements", "content": "Java has several control flow statements, such as if-else, switch-case, and loops like for, while, and do-while."},
          
          "6": {"title": "Java Methods", "content": "Methods in Java are blocks of code that perform a specific task and are executed when called from the main program."},
          
          "7": {"title": "Object-Oriented Programming", "content": "Java is an object-oriented language, which means it has constructs to create and manipulate objects."},
          
          "8": {"title": "Java Standard Library", "content": "The Java Standard Library provides a wealth of precompiled classes and interfaces for a wide range of functionalities."},
          
          "9": {"title": "Exception Handling", "content": "Java provides built-in support for exception handling, which is one of the powerful mechanisms to handle runtime errors."},
          
          "10": {"title": "Java APIs", "content": "Java APIs (Application Programming Interfaces) are precompiled libraries that provide a large number of methods for performing standard programming tasks."}
        }`,
          quizzes: `{
          "1": {
            "title": "What is Java?",
            "type": "checkbox",
            "answer": "A coffee brand, A programming language, A planet",
            "correct_answer": "A programming language"
          },
          "2": {
            "title": "Which of the following is a Java data type?",
            "type": "checkbox",
            "answer": "int, var, floaty",
            "correct_answer": "int"
          },
          "3": {
            "title": "What is the correct way to start a for loop in Java?",
            "type": "checkbox",
            "answer": "for x in y, for (int i = 0; i < 10; i++), for each x in y",
            "correct_answer": "for (int i = 0; i < 10; i++)"
          },
          "4": {
            "title": "Which operator is used for equality check?",
            "type": "checkbox",
            "answer": "==, ===, =",
            "correct_answer": "=="
          },
          "5": {
            "title": "Which keyword is used to define a class in Java?",
            "type": "checkbox",
            "answer": "class, def, Class",
            "correct_answer": "class"
          },
          "6": {
            "title": "Which of the following is NOT a Java loop?",
            "type": "checkbox",
            "answer": "for, while, repeat",
            "correct_answer": "repeat"
          },
          "7": {
            "title": "Which keyword is used to inherit a class?",
            "type": "checkbox",
            "answer": "extends, inherit, super",
            "correct_answer": "extends"
          },
          "8": {
            "title": "Which package is automatically imported in Java?",
            "type": "checkbox",
            "answer": "java.lang, java.util, java.io",
            "correct_answer": "java.lang"
          },
          "9": {
            "title": "Which of the following is used to handle exceptions?",
            "type": "checkbox",
            "answer": "try-catch, if-else, handleError",
            "correct_answer": "try-catch"
          },
          "10": {
            "title": "Which of the following is a Java API?",
            "type": "checkbox",
            "answer": "JavaFX, Swing, Both",
            "correct_answer": "Both"
          }
        }`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      await queryInterface.bulkInsert("users", [
        {
          fullName: "Cristian F",
          username: "FloreaCT",
          email: "floreact@gmail.com",
          password: "1234qwer",
          avatar: "https://i.imgur.com/4KeKvtH.png",
        },
      ])
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
