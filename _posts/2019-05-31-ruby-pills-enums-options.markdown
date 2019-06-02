---
layout: post
title:  "Ruby Pills: Enums Options"
date:   2019-05-31 19:07:12 -0300
categories: ruby backend pills tips
---

<img src="/assets/img/ruby_pills.png">

## Ruby Enums

Ruby does not have native support to `enum` (as a core module/class or keyword). Many coming from other programming languages may miss this feature (myself included, as I came from C#).

It doesn't want to say that you cannot represent an enum with Ruby in many ways (like we all like!)

In this Ruby Pill, I'll cover 3 ways to define enum's in your Ruby code!

## 1º - A Simple Module

Take a look at this module and an example of its use:

```ruby
module AlertType
  Email = 0
  Sms = 1
  Push = 2
  Letter = 3
end

class Notification
  include AlertType
  # AlertType::Push => Using inside the class (You can even omit the module name here)
end

p Notification::Push # => 2
```

If your main goal is to improve the legibility and organization of your code but aren't worried about the value of each option (maybe it's just ids in a domain table of your database), this is the simplest and most straightforward enum that you'll have!

## 2º - Using Constants

If you want to have access to all enum values, as a constant of your class, you can use a trick with class constants:

```ruby
class Notification
  include AlertType
  ENUM_VALUES = [STRING_VALUE = "value1", SYMBOL_VALUE = :value2]
end

p Notification::STRING_VALUE # => "value1" 
p Notification::SYMBOL_VALUE # => :value2
```

Even the constants defined inside the `ENUM_VALUES` array can be used as class constants normally. And, this way you can access all values of the enum at the same time with `Notification::ENUM_VALUES`. 

> If the main constant `ENUM_VALUES` is inside the module that your class includes (like the first example), this works too!

## 3º - With Some Metaprogramming

I'll guide you through the code itself in this example:

```ruby
module Kernel
  # Defining a method on the Ruby's Kernel module 
  def enum(values)
    # Each time we call it, a new module is created with a block
    Module.new do |mod|
      # first, we iterates on the list of values passed to this method
      values.each_with_index do |value, index|
        # then a constant is defined (using `const_set`), whose name is the capitalized value
        # this assumes that all values that you passed responds to #to_s (be careful!)
        mod.const_set(value.to_s.capitalize, 2**index)
      end

      # Overriding `inspect` for convenience only
      def mod.inspect
        "#{self.name} {#{self.constants.join(', ')}}"
      end
    end
  end
end
```

You then could use it like this:

```ruby
Status = enum %w[draft published trashed banished]

class Article
  include Status

  def self.available_statuses
    Status.inspect
  end
end

puts Status.class               # => Module
puts Article::Trashed           # => 4
puts Article.available_statuses # => Status {Banished, Draft, Published, Trashed}
```

## Final Thoughts

Although Ruby doesn't implement enums natively, there are at least 3 ways to fill in this gap, if you like to organize your code this way! 

_Are you using enums? Do you define them some other way or maybe using a gem?_ 

_Let me know if you liked this post! If you have any suggestions or critics, post a comment below!_
