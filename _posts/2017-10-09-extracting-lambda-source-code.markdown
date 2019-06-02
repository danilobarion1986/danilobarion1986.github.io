---
layout: post
title:  "Extracting Lambda Source Code"
date:   2017-10-09 19:08:58 -0300
categories: ruby backend
---

![source-code](https://devdanilo.files.wordpress.com/2017/10/source-code.jpeg)

In this post, I'll show you how to extract the code definition of a Lambda object, using just pure Ruby! But, first things first! What is a lambda in Ruby? A lambda is a special type of Proc, with some little differences in syntax, behavior and functionality, one of them that could be used as an anonymous function. There are many articles with all the details of what a lambda is and its main differences from a Proc and a block, one of them is [this](http://culttt.com/2015/05/13/what-are-lambdas-in-ruby.).

At one of my side-projects, I wanted to extract the definition of one property of my class, which is a lambda defined by the user and make a little markdown documentation page with this code on it. Then I thought: "Well, Ruby must have some special method call to do this... Or maybe the object itself (lambda) has a `to_s`-like method that returns its own definition...". But, well, for my surprise it was not so simple...

## Trying some code...

Then, I googled a little bit and found some gems that work, but honestly, it's a so tiny part of my project that I don't want to add an entire extra-project just to extract source code from a lambda object... Besides this, my goal is to make a gem that doesn't have third-party dependencies at all... Then, after some reading, coding, testing, refactoring, this was my result:

{% gist f413a13ccd090f802600ee8bbc0e23ca %}

It's a simple class, with one public method (lambda2source), that receives the lambda object and returns its source code as a string. If the passed parameter it's not a lambda, it raises an ArgumentError exception, with an informative message. Else, it checks what syntax was used to define the lambda (matching one of the two possibilities). This return is already the source code that I want to use.

## Cons

With this approach, I could easily retrieve the code that I want, without using any third-party code/gem get this functionality in my project. Even though is a simple solution, we have some limitations like, for example, it's not possible to extract the source code of lambdas defined at runtime. But, for my needs, it's enough.
So, I have a solution that is simple and I don’t need to worry with some dependency that might break one of the main features that I want to provide, that is auto-generated documentation!


_Are you careful about add third-party code to your applications too?_ 

_Let me know if you liked this post! If you have any suggestions or critics, post a comment below!_
