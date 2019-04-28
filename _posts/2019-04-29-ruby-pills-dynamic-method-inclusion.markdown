---
layout: post
title:  "Ruby Pills: Dynamic Method Inclusion"
date:   2019-04-29 11:01:42 -0300
categories: ruby backend pills tips
---

<img src="/assets/img/ruby_pills.png">

## Ruby Metaprogramming 

Ruby is an amazing programming language in many aspects, specially regarding metaprogramming! The fact that everything is an object, give to programmer the ability to manipulate methods and closures, the inheritance chain classes, callbacks, have modules with common code, and a lot of other nice things!

In this Ruby Pill I'll cover 3 module callbacks (`included`, `extended` and `method_added`), to dynamically add methods to a class. 

## Module included

Let's take a module with the 3 callbacks that we'll are using:

```ruby
module Example
  def self.included(base); end

  def self.extended(base); end

  def self.method_added(method_name); end
end
```

Despite the descriptive names, follows a summary of each method:
- _included(base)_ : executed after you _include_ the module. If you add some method here, it will be an __instance__ method of your class.  
- _extended(base)_ : executed after you _extend_ the module. If you add some method here, it will be a __class__ method of your class.
    > In both cases, _base_ refers to the class where you include/extend the module.

- _method_added(method_name)_: Here you can put the code to be executed after you've been added a method in your class.

## Adding Methods Dinamically

Here is our module with its callbacks and implementations:

```ruby
module Example
  def self.included(base)
    add_new_method(base)
  end

  def self.extended(base)
    add_new_method(base)
  end

  def self.method_added(method_name)
    puts "Adding #{method_name.inspect}"
  end

  private

  def self.add_new_method(base)
    base_name = base.name
    define_method("#{base_name.downcase}_new_method") do |value|
      "Method added in #{base_name} class => Value passed: #{value}"
    end
  end
end
```

The magic is inside our `add_new_method` private method. It's called inside `included` and `extended` callbacks, passing the `base` variable, that is our class. Using `define_method` method, we add a new method called `<CLASS_NAME>_new_method`.

To see them in action, we could use it like this:

```ruby
class Wow
  include Example
end
puts Wow.new.wow_new_method(:wow) 
# => Adding :wow_new_method
# => Method added in Wow class => Value passed: :wow

class Cool
  extend Example
end
puts Cool.cool_new_method(:cool)
# => Adding :cool_new_method
# => Method added in Cool class => Value passed: :cool
```

Cool! Besides add new instance/class methods to our classes, we can see the message of the `method_added` callback after each one is added!

## Final Thougths

This only scratchs some of Ruby capabilities! There's a world of possibilities, methods and callbacks to use if you want to take a deep dive on Ruby metaprogramming!

One thing that you should be aware of is that how much more you use this kind of Ruby features, your code can become too slow, so be careful!

_Did you like this post? Did you already know about these module callbacks?_ 

_If you have any comments, suggestions or critics, post a comment below!_
