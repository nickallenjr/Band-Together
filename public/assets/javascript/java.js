var modal = document.getElementById('myModal');

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    $("#modalDiv1").css("display", "block")
}

span.onclick = function() {
    modal.style.display = "none";
}

$("#modalDiv1").on("click", function() {
    modal.style.display = "none";
    $("#modalDiv1").css("display", "none")
});

var modal2 = document.getElementById('myModal2');

var btn2 = document.getElementById("myBtn2");

var span2 = document.getElementsByClassName("close")[0];

btn2.onclick = function() {
    modal2.style.display = "block";
    $("#modalDiv1").css("display", "block")
}

span2.onclick = function() {
    modal2.style.display = "none";
}

$("#modalDiv1").on("click", function() {
    modal2.style.display = "none";
    $("#modalDiv1").css("display", "none")
});

//Sign In
$('#signIn').on('click', function(event) {
    event.preventDefault();

    var userData = {
        email: $('#email').val().trim(),
        password: $('#password').val().trim()
    };

    if (!userData.email || !userData.password) {
      alert('You must enter a Email and Password!');
    }else {
        $.post('/api/login', {
            email: userData.email,
            password: userData.password
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            console.log(err)
        });

        $('#email').val('');
        $('#password').val('');
    }  
});

//Sign Up
$('#create').on('click', function(event) {
    event.preventDefault();

    var userData = {
        email: $('#createEmail').val().trim(),
        password: $('#createPassword').val().trim()
    };

    if (!userData.email || !userData.password) {
      alert('You must enter a Email and Password!');      
    }else {
        signUpUser(userData.email, userData.password);
    }

    $('#createEmail').val("");
    $('#createPassword').val("");
    $('#confirmPassword').val("");
  });

  function signUpUser(email, password) {
    $.post("/api/register", {
      email: email,
      password: password
    }).then(function(data) {
      console.log(data);
      if (data.errors) {
        alert('Error: ' + data.errors[0].message);
      }
      else {
        window.location.replace(data);
      }
    }).catch(function(err) {
        console.log(err);
    });
  }



