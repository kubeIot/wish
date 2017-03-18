/**
 * Created by vilemhujnak on 18/12/2016.
 */
"use strict";
$(function() {
    $(document).ready(function() {

        $('body').on('click', '.btn-danger', function() {
            confirm("Are you sure?");
        });

        $('body').on('click', '.datepicker', function() {
            $(this).datepicker();
        });

    });
});