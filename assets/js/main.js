$(window).on('load', function() {
    $('.preloader').fadeIn();
    $('.preloader').fadeOut();
})

$("a[xhrloc], button[xhrloc]").on('click', function (e) {
    e.preventDefault();
    let xhrloc = $(this).attr('xhrloc');
    $.ajax({
        url: $(this).attr('xhrloc'),
        method: 'get',
        beforeSend: function() {
            $(".preloader").fadeIn();
        },
        complete: function() {
            $('.preloader').fadeOut();
        },
        success: function (resp) {
            $('#profile-content').html(resp);
            window.history.pushState("", "", xhrloc);
        }
    })
})

function ConvertFormToJSON(serializedArray){
    let json = {};
    
    serializedArray.forEach((jsonObject) => {
        json[jsonObject.name] = jsonObject.value || '';
    });
    
    return json;
}

$(document).on('submit',"#add-travel-form", (e) => {
    e.preventDefault();
    /*let tmp_travel_datas = $('#add-travel-form input, #add-travel-form textarea').not('#destinations-fieldset input').serializeArray();
    let travel_datas = ConvertFormToJSON(tmp_travel_datas);
    let destinations = [];
    $('#add-travel-form fieldset input[name^="destination[destination]"]').each((index, input) => {
        let inbr = input.getAttribute("inbr");
        destinations.push({destination: input.value, starting_date: $(`input[name="destination[${inbr}][starting_date]"]`).val(), ending_date:$(`input[name="destination[${inbr}][ending_date]"]`).val() })
    })*/
    let fd = new FormData(document.getElementById('add-travel-form'));
    $.ajax({
        url: '/add-travel',
        method: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: () => {
            $('.preloader').fadeIn();
        },
        complete: () => {
            $('.preloader').fadeOut();
        },
        error: (res) => {

        },
        success: (res) => {
            let html = res;
            $("#content").html(html);
        }
    })
})

function searchTable() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBarInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("settings-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

$('#profile-content-slct li.nav-item').on('click', function(e) {
    e.preventDefault();
    $('#profile-content-slct li.nav-item').removeClass('active');
    $(this).addClass('active');
    let contentUrl = $(this).attr('xmlContentUrl');
    $.ajax({
        url: contentUrl,
        method: 'get',
        beforeSend: () => {
            $('.preloader').fadeIn();
        },
        complete: () => {
            $('.preloader').fadeOut();
        },
        error: (res) => {

        },
        success: (res) => {
            let html = res;
            $("#profile-content").html(html);
        }
    })
});

$('#follow-button').on('click', function(e) {
    e.preventDefault();
    let user_id = $(this).attr('user-id');
    $.ajax({
        url: '/follow',
        method: 'post',
        data: user_id,
        beforeSend: () => {
            $('.preloader').fadeIn();
        },
        complete: () => {
            $('.preloader').fadeOut();
        },
        error: (res) => {

        },
        success: (res) => {
            let html = res;
            $("#profile-content").html(html);
        }
    })
});

$(document).on('submit','#destinations-fieldset', function(e) {
    e.preventDefault();
    let fd = new FormData(document.getElementById('destinations-fieldset'));
    for (var value of fd.entries()) {
        console.log(value);
     }
    /*$.ajax({
        url: '/add-destination',
        method: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: () => {
            $('.preloader').fadeIn();
        },
        complete: () => {
            $('.preloader').fadeOut();
        },
        error: (res) => {

        },
        success: (res) => {
            let html = res;
            //$("#content").html(html);
        }
    })*/
})

var inputNbr = 1;
$('#add-destination-btn').on('click', function(e) {
    e.preventDefault();
    $('#destination-area').append(
        `<div class="mb-2 accordion" id="i-group-${inputNbr}">
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${inputNbr}">
                    <div class="input-group">
                        <input required type="text" class="form-control" placeholder="Where did you go ?" aria-label="destination" name="destination[destination][${inputNbr}]" inbr="${inputNbr}">
                        <span class="input-group-text"><a onclick="deleteDestination(${inputNbr})"><i class="bi bi-dash-circle d-flex justify-content-center align-items-center"></i></a></span>
                        <span class="input-group-text"><a data-bs-toggle="collapse" data-bs-target="#collapse-${inputNbr}" aria-expanded="true" aria-controls="collapse-${inputNbr}" onclick="$(this)"><i class="bi bi-caret-down d-flex justify-content-center align-items-center"></i></a></span>
                    </div>
                </h2>
                <div id="collapse-${inputNbr}" class="accordion-collapse collapse show" aria-labelledby="heading-${inputNbr}" data-bs-parent="#i-group-${inputNbr}">
                    <div class="accordion-body">
                        <div class="row g-3 mb-3">
                            <div class="col">
                                <div class="input-group date">
                                    <input required inbr="${inputNbr}" name="destination[${inputNbr}][starting_date]" placeholder="From ?" type="text" data-provide="datepicker" class="form-control"><span class="input-group-text"><i class="bi bi-calendar-check"></i></span>
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group date">
                                    <input required inbr="${inputNbr}" name="destination[${inputNbr}][ending_date]" placeholder="To ?" type="text" data-provide="datepicker" class="form-control"><span class="input-group-text"><i class="bi bi-calendar-check"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
    inputNbr++;
});
function deleteDestination(n) {
    $(`#i-group-${n}`).remove();
}
