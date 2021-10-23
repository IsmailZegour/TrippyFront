$(window).on('load', function() {
    $('.preloader').fadeOut();
})

$(document).on('submit', "#loginForm", function(e) {
    e.preventDefault();
    let datas = $(this).serializeArray();
    $.ajax({
        url: 'http://localhost:8080/user/login',
        method: 'POST',
        xhrFields: {
            withCredentials: true,
        },
        data: datas,
        beforeSend: function() {
            $('.preloader').fadeIn();
        },
        complete: function() {
            $('.preloader').fadeOut();
        },
        error: function(resp) {
            $('#err_msg').html(resp.responseJSON.message);
        },
        success: function (resp) {
            $('#err_msg').html('');
            console.log("LogIn successfully - Welcome")
            window.location.replace('/authenticate');
        }
    })
});

$(document).on('submit', "#registerForm", function(e) {
    e.preventDefault();
    let datas = $(this).serializeArray();
    if($('input[name="password"]').val()!==$('input[name="password_confirmation"]').val()) {
        $('#err_msg').html('Password and password confirmation do not match');
    } else {
        $.ajax({
            url: 'http://localhost:8080/user/register',
            method: 'POST',
            data: datas,
            beforeSend: function() {
                $('.preloader').fadeIn();
            },
            complete: function() {
                $('.preloader').fadeOut();
            },
            error: function(resp) {
            },
            success: function (resp) {
                $("#toast-container .toast .toast-body").html('Successfully registered !');
                toast();
                window.location = '/access/'
            }
        })
    }
});

function toast() {
    $(".toast").toast();
    $(".toast").toast('show');
}