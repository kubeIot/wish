/**
 * Created by skylele on 5.3.17.
 */
$(window).on('resize', function() {
    if($(window).width() > 800) {
        $('#profile-navbar').addClass('no-margin');
    }else{
        $('#profile-navbar').removeClass('no-margin');
    }
})

