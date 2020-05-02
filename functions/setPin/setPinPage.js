exports.htmlTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  <meta charset="utf-8">
  <title>WaTutor Signup</title>
</head>
<style>
  .img-bg {
    /* The image used */
    background-image: url("http://box2127.temp.domains/~watutors/wp-content/uploads/2020/04/blur-classroom.png");

    /* Full height */

    /* Center and scale the image nicely */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100vh;
    /* responsive height */
  }
</style>

<body class="bg-secondary img-bg">


  <div class="row justify-content-center align-items-center no-gutters">
    <div class="col col-12 col-sm-11 col-md-8 col-lg-5 m-5 bg-white rounded" style='max-width: 600px;'>

      <!-- Default form login -->
      <form class="text-center p-4" onSubmit="return false;" id='mainform'>

        <h2>##EMAIL##</h2>

        <div class="container">
          <img
            src="https://i1.wp.com/box2127.temp.domains/~watutors/wp-content/uploads/2020/04/cropped-WaTutors-Logo.png?w=190"
            class="img-fluid" alt="Responsive Image" width="100" height="100" />
        </div>

        <h1 class="h4 mb-4">Confirm Your WaTutors Account</h1>

        <p class='mb-4'>
          Please confirm your email address and set a 4 digit pin.
          <br>
          This pin will be used to give you, the account owner, control over scheduling and payments in the app.
        </p>

        <!-- Name (preset)  DEPRECIATED
        <span id='nameinfo' class="text-danger mt-4"></span>
        <div class="form-row mb-2">
          <div class="col">
            <input type="text" id="formfirstname" class="form-control" placeholder="Your first name">
          </div>
          <div class="col">
            <input type="text" id="formlastname" class="form-control" placeholder="Your last name">
          </div>
        </div>
        -->

        <!-- Pin -->
        <span id='pininfo' class="text-danger"></span>
        <input type="number" id="formpin" class="form-control mb-2" placeholder="4 Digit Pin">

        <!-- Checkbox -->
        <div id='checktext'>
          <span id='checkinfo' class="text-danger"></span>
          <p><input id='acceptcheckbox' type="checkbox"> I am over 16 and accept ownership of this account</p>
        </div>

        <!-- Sign in button -->
        <button class="btn btn-block mt-4 text-white" type="submit" style="background-color:#3678FA;">Submit</button>
        <span id='statustext'></span>

        <!-- Register -->
        <p class="mt-1">By submitting, you agree to our
          <a href="http://watutors.com/privacy-policy-2/">privacy policy</a>
        </p>
      </form>

      <!-- Post form ui -->
      <div class='text-center p-4' id='sentconfirm' style="display:none;">
        <div class="container">
          <img
            src="https://i1.wp.com/box2127.temp.domains/~watutors/wp-content/uploads/2020/04/cropped-WaTutors-Logo.png?w=190"
            class="img-fluid" alt="Responsive Image" width="100" height="100" />
        </div>

        <h1 class="mb-3">Account Verified!</h1>
        <h4 class="mb-3" id='pinconfirm'></h4>
        <p class="mb-3">Get started by scheduling your first call using the app!</p>
        <a href="https://watutors.page.link/signUp" class="mx-4" role="button"><i class="fab fa-app-store fa-5x"></i></a>
        <a href="https://watutors.page.link/signUp" class="mx-4" role="button"><i class="fab fa-google-play fa-5x"></i></a>
        <p class="mt-4"> Log in using your email address</p>
      </div>

    </div>
  </div>
</body>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
  integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/396bdb6509.js" crossorigin="anonymous"></script>

<script language='JavaScript'>
  $(document).ready(function () {
    $('#sentconfirm').hide(); // hide confirm message


    $('#checktext').click(function () {
      // toggle acceptcheckbox
      $('#acceptcheckbox').attr('checked', !$('#acceptcheckbox').prop("checked"))
    })

    $('#mainform').submit(function () {
      var newpin = $("#formpin").val()
      /* name depreciated
      var newfirstname = $('#formfirstname').val()
      var newlastname = $('#formlastname').val()
      */

      var nameValid = true;   // name fields depreciated, original: newlastname.length > 2 && newfirstname.length > 2;
      var pinValid = newpin.length === 4
      var checkValid = $('#acceptcheckbox').is(":checked")

      // reset status text
      $('#pininfo').text('').show();
      $('#nameinfo').text('').show();
      $('#statustext').text('').show();
      $('#checkinfo').text("").show();


      if (pinValid && nameValid && checkValid) {
        $('#statustext').attr('class', 'text-primary')
        $('#statustext').text('Sending request...').show() // show confirmation message

        var body = {
          token: '##CODE##', 
          // emailName: newfirstname + ' ' + newlastname,
          pin: newpin,
        };

        // second attempt
        var url = "https://wa-tutors.appspot.com/users/parent/pin" // TODO change url root after deployment

        function onAjaxSuccess(resp) {
          $('#statustext').attr('class', 'text-success')
          $('#statustext').text('Account Confirmed! Set up a call in the app').show() // show confirmation message

          // show ui post update 
          $('#mainform').hide(500, function() {
            $('#pinconfirm').text('Your pin: '+newpin) 
            $('#sentconfirm').show(500);
          });
        }

        function onAjaxFail(e) {
          alert('Error: ' + JSON.stringify(e));
        }

        $.ajax({
          url: url + "?callback=?",
          data: JSON.stringify(body),
          type: 'POST',
          contentType: "application/json",
          success: onAjaxSuccess,
          error: onAjaxFail,
        });
      }

      // show error messages
      if (!pinValid)
        $('#pininfo').text('Pin must be exactly 4 digits').show();
      if (!nameValid)
        $('#nameinfo').text("Invalid name").show();
      if (!checkValid)
        $('#checkinfo').text("Required").show();

    });

  });
</script>

</html>
`;
