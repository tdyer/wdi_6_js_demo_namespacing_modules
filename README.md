![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# Javascript Namespacing \& Modules

## Objectives

By the end of this, students should be able to:

- Create a namespace for your application.
- Use a immediately-invoked functions expressions (IIFEs) to implement encapsulation and privacy.
- Recall the four steps to creating modules (also called namespaces) in JavaScript
- Write functions that return objects
- Recall why functions inside JS modules are "private"

## Instructions

1. Fork and clone.
1. `npm install`.
1. `bower install`.
1. Await further instuctions.

## Review: Functions and Objects in JavaScript

The two main ways we've created objects in JavaScript thus far are:

1. Using object literals (`{}`).
1. Using constructor functions and prototypes with the `new` keyword.

```js
// using an object literal to directly create an instance of an object
var song = {
    title: "Shake It Off",
    artist: "Taylor Swift",
    album: "1989",
    display: function () {
      return this.title + " by " + this.artist + " on " + this.album;
    }
};

song.display();
```

The problem with creating all our objects like this is sometimes we want multiple objects that share a similar structure but contain different data. We use prototypal inheritance in JavaScript to define the structure of our objects before creating new instances.

```js
// using a constructor function and prototype to define an object's structure
// before creating instances
var Song = function (title, artist, album) {
    this.title = title;
    this.artist = artist;
    this.album = album;
}

Song.prototype.display = function () {
    return this.title + " by " + this.artist + " on " + this.album;
}

var song = new Song("Shake It Off", "Taylor Swift", "1989");
song.display();
```

This is a little more verbose but allows us to define our objects' structure. In modern JavaScript web development, we prefer a different approach. The constructor function in the previous example is attached to the global namespace (the `window` object in browsers). We're limited to one constructor named `Song` for our entire app. If our app integrates Spotify, Rdio, and Vevo search results in one window, how could we have a separate `Song` constructor for each API we wanted to consume? The answer is modules: we could create new Spotify songs with `Spotify.Song()` and new Rdio songs with `Rdio.Song()`.

The key to understanding modules in JavaScript is that functions in JavaScript can **return any value**, be it a primitive (`String`) or reference (`Object`).

## The Module Pattern

Immediately-Invoked Function Expressions (IIFEs) are anonymous function that are immediately invoked, and they look like this:

```js
(function () {
    // ...
})();
```

The parends on the last line cause the function to be immediately invoked. This creates a new scope, isolating any inside our IIFE from the global namespace. This is useful for many reasons, but we can't use it later unless we assign it.

```js
var MyModule = (function () {
    // ...
})();
```

Since we have a new scope, anything defined inside the scope is not accessible from the outside.

```js
var MyModule = (function () {
    var myFunction = function () {
        return "Hello from inside a closure!";
    }
})();

// How would you even access myFunction from here?
```

We have to explicitly return things that we want to be accessible from the outside. This allows us to freely use any number of variables inside the module without worrying about colliding with similar names from other code in our application. We only expose the data or functions we need, and we can choose what to name them whatever we want in our global scope.

```js
var MyModule = (function () {
    var myFunction = function () {
        return "Hello from inside a closure!";
    };

    var _privateFunction = function () {
        return "I'm not returned below, so I can't be accessed from "
        + "outside. The '_' character is used a visual indication "
        + "that I'm private. I **can** still be used from a peer "
        + "function, like myFunction.";
    };

    return {
        greet: myFunction
    };
})();

MyModule.greet(); //=> "Hello from inside a closure!"
var hi = MyModule.greet;
hi(); //=> "Hello from inside a closure!"

```

The basic formula for creating modules in JavaScript:

1. Use an IIFE to create a new scope for your code.
1. Assign the IIFE to a well-named variable.
1. Write your code.
1. Expose public data and methods by returning an object literal.

## Lab: Search Spotify for a Song

Pair with a classmate and read the code in `app/js/spotify.js`. Trace through the code with your partner until you both can answer the following questions:

1. Are variables inside nested functions available from the outside? Are variabls from outer functions available to inner functions?
1. Which data and methods are exposed for public use? Which are kept private for use inside the module?
1. Which line(s) in the code allow us to use `Spotify.Song(//...)` in our application code?

    ```js
    shake = Spotify.Song("Shake It Off", "Taylor Swift", "1989");
    ```

Finally, make the `display` and `search` methods work. Tests have been written for you, as has some code. 

## Additional Resources

- [Learning JavaScript Design Patterns - Module Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
- [Mastering the Module Pattern](http://toddmotto.com/mastering-the-module-pattern/)
