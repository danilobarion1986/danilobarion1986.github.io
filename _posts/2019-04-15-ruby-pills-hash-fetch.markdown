---
layout: post
title:  "Ruby Pills: Hash Fetch and Performance"
date:   2019-04-15 13:24:08 -0300
categories: ruby backend pills tips
---

<img src="/assets/img/ruby_pills.png">

## Ruby Hash 

The Hash class is widely used in Ruby code, due to its key/value structure. It have many interesting methods, aside from most basic ones, like `#default` and `#key?`, used to return a default value if the desired key was not found and verify if some key exists, respectively. There are accessor methods like `#[]`, that return `nil` if the key don't exists, and `#fetch` that you raise an error instead.  

However some methods like `#fetch` have different arities: 
- with 1 argument and a block, being the code evaluated inside the block the default value.
- with 2 arguments, being the first one the key that you want to find the value, and the second a default value when that key don't exists.

Example:
```ruby
hash = { a: 1, b: 2 }

# Both forms will return the default value, as the key don't exists
hash.fetch(:c, 3) # => 3
hash.fetch(:c) { 3 } # => 3
```

## Trickier `#fetch` Behaviour

As you saw both forms of calling `#fetch` have the same result, but is the difference only of style and preference of each developer? No! There's a subtle difference, that most times won't make any difference in your application performance. But, let's see an example to understand the impact of a wrong choice:

Imagine that you have an intensive operation to do, if you don't find a key in your Hash:

```ruby
class MyClass
  self.my_intensive_computation
    sleep 5
  end
end

hash = { my_key: :ok }
hash.fetch(:my_key, MyClass.my_intensive_computation)
# after 5 seconds you'll get... => :ok
```

Oh, did you see what just happened?! Even with the key present in your hash, Ruby evaluated the default value, that is your intensive computation method!

Now if you use the block way:

```ruby
hash = { my_key: :ok }
hash.fetch(:my_key) { MyClass.my_intensive_computation }
# instantly get... => :ok
```

## Final Thougths

Some methods in Ruby may receive a block as last argument, and even return the same result when you pass a block to it. But some methods like `Hash#fetch` can have trickier behaviour when used with or without passing a block, that could have an important impact on your application. 

Be aware of different behaviour of each form and write the code accordingly with your needs!

_Did you already know about this behaviour of Hash#fetch?_ 

_Let me know if you liked this post! If you have any suggestions or critics, post a comment below!_
