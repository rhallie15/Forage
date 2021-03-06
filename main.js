 /*
            var TestObject = Parse.Object.extend("TestObject");
            var testObject = new TestObject();
            testObject.save({foo: "bar"}).then(function(object) {
              alert("yay! it worked");
            });
            */
            
            var address = '';
            
            var getMessages = function() {
                var q = new Parse.Query("Message");
                q.limit(10);
                q.descending("createdAt");
                q.find().then(function(messages) {
//                    messages.reverse();
                    displayMessages(messages);
                });
            };

            var saveMessage = function(foodItem, alergens, address){
                var message = new Parse.Object("Message");
                message.set("foodItem", foodItem);
                message.set("alergens", alergens);
                message.set("address", address);
                message.save().then(function() {
//                    alert("Added " + foodItem + " which contains: " + alergens + " at " + address);
                }, function(err){
                    alert("Error");
                    console.log(err);
                });
            }
            
            var displayMessages = function(messages) {
                var messagesDiv = $("#messages");
                messagesDiv.hide().empty().remove();
                $.each(messages, function(_, message) {
                    var foodItemClass = "foodItem";

                    // Simple and straightforward, but suboptimal
                    var row = [ "<p><span class='", foodItemClass, "'>",
                                " [",
                                message.createdAt.getHours(),
                                ":",
                                message.createdAt.getMinutes(),
                                "] ",
                                message.get("foodItem"),
                                " contains ",
                                message.get("alergens"),
                                " at ",
                                message.get("address"),
                                "</span></p>" ].join("");
                    messagesDiv.append(row);
                  });
                  $("#display").append(messagesDiv);
                  messagesDiv.fadeIn();
            };
            
            
            var setAddress = function(thisAddress) {
                address = thisAddress;
            }

            // Attach handler to the "Send" button
            $("#submitButton").click(function() {
              // Pull the values out of the HTML inputs
              var foodItem = $("#foodItem").val();
                
              var alergens = "";
              var alergens_array = $(':checked').map(function(i,n) {
                  return $(n).val();
              }).get(); //get
                
                
              if (alergens_array.length == 1){
                  alergens += alergens_array[0];
              }
              else {
                  for (i = 0; i < alergens_array.length; i++){
                      if (i == alergens_array.length - 1){
                          alergens += alergens_array[i];
                      }
                      else {
                          alergens += alergens_array[i] + ", ";
                      }
                  }
              }
              
              //var address = $("#address").val();
              
              if (foodItem.length === 0) {
                return false;
              }
                
              // Take those values and actually save the message
              saveMessage(foodItem, alergens, address);
                
              // Clean up after ourselves - reset our input and reload the chat
              $(':checked').each(function() {
                  $(this).prop("checked", false);
              });
                
              $("#foodItem").val("");
              // $("#address").val("");
              address = "";
                
              getMessages();
            });
            
            $("clearButton").click(function() {
                
            });
            
            /*
            $("clearButton").click(function() {
                var q = new Parse.Query("Message");
                q.descending("createdAt");
                q.find().then(function(messages) {
                    
                    messages.destroy({
                    success: function(myObject) {
                      // The object was deleted from the Parse Cloud.
                    },
                    error: function(myObject, error) {
                      // The delete failed.
                      // error is a Parse.Error with an error code and message.
                    }
                    });
//                    messages.reverse();
//                    displayMessages(messages);
                });
            }
            */
            
        
/*
// IMPLEMENT ME:
// 
// Use a Parse Query to get objects of type "Message". Start off with a limit
// of 10 items, then experiment with Query conditions to grab different
// messages other folks have created.
//
// Documentation: https://parse.com/docs/js_guide#queries-basic
var getMessages = function() {
  var q = new Parse.Query("Message");
  q.limit(10);
  q.descending("createdAt");
  q.find().then(function(messages) {
    messages.reverse();
    displayMessages(messages);
  });

  // We've defined a success handler for you! After you've constructed your
  // query, pass it `displayMessages` (defined in setup.js) to handle the
  // rendering of the messages.
};

// IMPLEMENT ME:
// 
// Create a new Parse Object (with "Message" as the class name) and use the
// "username" and "messageBody" parameters to save an object.
//
// Documentation: https://parse.com/docs/js_guide#objects
var saveMessage = function(username, messageBody) {
  var m = new Parse.Object("Message");
  m.set("username", username);
  m.set("body", messageBody);
  m.save().then(function() {
    getMessages();
  }, function(err) {
    console.log(err);
  });

  // Note that our .save() function is asynchronous! Instead of passing it a
  // callback directly, here's how you'd use a Promise to attach behavior on
  // success or failure:
  //
  // object.save().then(
  //   function(object) {
  //     console.log("Saved!");
  //     console.log(object);
  //   }, function(error) {
  //     console.log("Error!");
  //     console.log(error);
  //   });
  //
  // (Read more: http://blog.parse.com/2013/01/29/whats-so-great-about-javascript-promises/))
};

// Attach handler to the "Send" button
$("#send_button").click(function() {
  // Pull the values out of the HTML inputs
  var username = $("#username").val();
  var messageBody = $("#message").val();
  var color = $("#colors").val();
  if (messageBody.length === 0) {
    return false;
  }

  // Take those values and actually save the message
  saveMessage(username, messageBody);

  // Clean up after ourselves - reset our input and reload the chat
  $("#message").val("");
  getMessages();
});


// Attach handler to "Reload" link
$("#reload").click(getMessages);
// Get messages on load
getMessages();
*/        
        