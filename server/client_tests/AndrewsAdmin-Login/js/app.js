
$.holdReady(true);

$.getScript(((window.location.protocol == 'file:') ? "http:" : window.location.protocol) +
    "//api.backendless.com/sdk/js/latest/backendless.min.js", function() {
    $.holdReady(false);
    (function ($) {
        $.fn.wrongInput = function () {
            return this.each(function () {
                var $this = $(this),
                    $field = $this.is("input.txt") || $this.is("input[type=text]") ? $this : $this.find("input.txt"),
                    rmWrng = function ($field) {
                        $field.removeClass('wronginput');
                    };
                if ($field.hasClass('wronginput')) {
                    return
                }
                $field.addClass('wronginput');
                $field.one('input', function () {
                    rmWrng($field);
                });
            });
        };
    })(Zepto);

    function createPopup(text, type) {
        var $popup = $("<div class='popup'></div>"),
            $body = $('body');
        if (type) {
            $popup.addClass(type);
        }
        $popup.text(text);
        if ($body.find('.popup').length) {
            $('.popup').remove();
        }
        $body.append($popup);
        $popup.animate({
            right: '20px',
            opacity: 0.8
        }, 500);
        setTimeout(function () {
            $popup.animate({
                right: '-' + $popup.width() + 'px',
                opacity: 0
            }, 500);
            setTimeout(function () {
                $popup.remove();
            }, 500);
        }, 3000);
    }

    function userLoggedInStatus(user) {
        console.log("user has logged in");
        $('.login').hide();
        $('.logined').show();
    }

    
//Backendless: defaults
var APPLICATION_ID = '9D96215E-2443-01D3-FF5F-0FB6FD2E0600';
var API_KEY = '2ACF37D6-905D-7940-FFB3-D31A5ADE5B00';
Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, API_KEY);

if (!APPLICATION_ID || !API_KEY)
    alert("Missing application ID or api key arguments. Login to Backendless Console, select your app and get the ID and key from the Manage > App Settings screen. Copy/paste the values into the Backendless.initApp call located in AndrewsAdmin-Login.js");
    

    var loggedInUser, username, password, remember;

    var cache = Backendless.LocalCache.getAll();
    if (cache["stayLoggedIn"]) {
       var tokenExist = Backendless.UserService.isValidLogin();

       if (tokenExist) {
          userLoggedInStatus(cache["user-token"]);
       } else {
          Backendless.LocalCache.clear();
       }
    }

    function gotError(err) { // see more on error handling
        $('input').addClass("redBorder");

        console.error(err);

        if (err.code != 0) {
            createPopup(err.message || err, 'error');
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
        }
    }

    function userLoggedOut() {
        location.reload();
    }

    function logoutUser() {
        localStorage.clear();
        Backendless.UserService.logout().then(userLoggedOut, gotError);
    }

    $('#logout').on('click',function() {
        logoutUser();
    });

                                
    function gotErrorRegister(err) { // see more on error handling
        $('input').each(function() {
            if (err.message.indexOf($(this).attr('id')) !== -1) {
                $(this).addClass('redBorder');
            }
        });

        createPopup(err.message, 'error');
        console.log("error message - " + err.message);
        console.log("error code - " + err.statusCode);
    }

    function gotErrorRestore(err) { // see more on error handling
        $('input').addClass("redBorder");
        createPopup(err.message, 'error');
        console.log("error message - " + err.message);
        console.log("error code - " + err.statusCode);
    }

    function userRegistered(user) {
        console.log("user has been registered");
        $('.thankTemp').show();
        $('.regForm').hide();
    }

    function success() {
        $('.restorePass').hide();
        $('.thankTemp').show();
    }

    $('#remember').prop('checked', cache['stayLoggedIn']);

    $('#remember').on('change', function() {
        remember = $('#remember').prop("checked");
    });

    $('#user_login').on('click', function() {

        username = $('#login').val();
        password = $("#password").val();

        $('input').on('keydown', function() {
            $('input').removeClass('redBorder');
        });

        if (username == '') {
            createPopup("Identity cannot be empty!", 'error');
            $('#login').addClass("redBorder");

            return false;
        } else if (password === '') {
            createPopup('Password cannot be empty!', 'error');
            $('#password').addClass("redBorder");

            return false;
        }

        Backendless.UserService.login(username, password, remember).then(userLoggedInStatus, gotError);
    });

    $('.double, .int').on('input', function(e) {
        var $el = $(this),
        value = $el.val().trim(),
        pattern = /^((-(([1-9]+\d*(\.\d+)?)|(0\.0*[1-9]+)))|((0|([1-9]+\d*))(\.\d+)?))([eE](\+|\-)?\d+)?$/;

        if (value.search(pattern) === -1) {
           $el.val("");
        }
    });

    $(".date").datepicker({
        beforeShow: function(input, inst) {
            setTimeout(function () {
                inst.dpDiv.css({ left: 50 + '%', top:218, marginLeft: -30 });
            }, 0);
        }
    });

    $('#register').on('click', function() {
        var user = new Backendless.User();

        $('input').each(function() {
            var $el = $(this),
            value = $el.val().trim();

            if (value) {
                user[$el.attr("id")] = value;
            }
        });

        return Backendless.UserService.register(user).then(userRegistered, gotErrorRegister);
    });

    $('#restore').on('click', function(e) {
        e.preventDefault();

        $('.restorePass input').removeClass('redBorder');
        $('.login').hide();
        $('.restorePass').show();
    });

    $('#restorePassword').on('click',function() {
        var login = $('#loginRestore').val();

        $('input').on('keydown',function() {
            $('input').removeClass('redBorder');
        });

        if (login == '') {
            createPopup("Enter username!", 'error');
            $('input').addClass("redBorder");

            return false;
        }

        Backendless.UserService.restorePassword(login).then(success, gotErrorRestore);
    });
                                
    function callback(user) {
        $('.logined').show();
        $('.login').hide();

        console.log(user);
    }

                                
    $('#gplus_login').on('click', function() {
        Backendless.UserService.loginWithGooglePlus({ email: 'email', name: 'name' }, {}, remember).then(callback, gotError);
    });
                                
});
