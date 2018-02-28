(function() {
  'use strict'

  $.getJSON('/token')
    .done(loggedIn => {
      if (loggedIn) {
        $('.logout').on('click', () => {
          localStorage.clear()
          const options = {
            dataType: 'json',
            type: 'DELETE',
            url: '/token'
          }
          $.ajax(options)
            .done(() => {
              window.location.href = '/index.html'
            })
            .fail(() => {
              Materialize.toast('Unable to log out', 3000)
            })
        })
      }
    })

})()

const instructorFields = () => {
  $('.add_lessons').append(`
        <div class='row home-menu center'>
          <div class="center col s12 m12 l12">
            <a id="create_lesson" class="home-button btn waves-effect waves-light modal-trigger" type="submit" name="action" href="#new_lesson_modal">
            <text>Create Lesson</text></a>
          </div>
        </div>`)
}

const checkPrivileges = () => {
  let skill_level
  $.get('/token').done( (result) => {
    const id = result.cookie.user_id
    $.get(`/users/${id}`)
      .done(data => {
        skill_level = data.skill_level_id
        if (skill_level == 4) {
          instructorFields()
          createLessonModal()
          return
        }
      })
  })
}

const createAccountOverview = (data) => {
  const newCard = `
    <div id="myProfile">
      <table>
        <thead>
          <div><h3 class="left">My Profile</h3></div>
          <div id="show_avatar_image">
          <img src="${data.user_avatar}" height="250px" width="250px" class="center">
          </div>
      </thead>
        <tbody class="profBody">
          <tr>
            <td>First Name</td>
            <td id="first_name"></td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td id="last_name"></td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td id="phone_number"></td>
          </tr>
          <tr>
            <td>Email</td>
            <td id="email_address"></td>
          </tr>
          <tr>
            <td>Skill Level</td>
            <td id="skill_level_id"></td>
          </tr>
          <tr>
            <td>Bio</td>
            <td id="bio"></td>
          </tr>
        </tbody>
      </table>
      <div class="row center">
        <button id="editButton" class="btn waves-effect waves-light" type="submit" name="action">Edit Profile</button>
      </div>
    </div>`

  $('#edit_card').remove()
  $('#profile_card').append(newCard)
  $('#first_name').append(data.first_name)
  $('#last_name').append(data.last_name)
  $('#phone_number').append(data.phone_number)
  $('#email_address').append(data.email_address)
  $('#skill_level_id').append(data.skill_level_id)
  $('#bio').append(data.bio)

  $('#editButton').click(function(event) {
    event.preventDefault()
    editWindow()
  })
}

const getAccount = () => {
  $.get('/token').done( (result) => {
    const id = result.cookie.user_id
    localStorage.setItem("user_id", id)
    $.get(`/users/${id}`).done((data) => {
      localStorage.setItem("user_profile", JSON.stringify(data))
      $('#first_name').append(data.first_name)
      $('#last_name').append(data.last_name)
      $('#phone_number').append(data.phone_number)
      $('#email_address').append(data.email_address)
      $('#logout_text').append(data.email_address)
      $('#skill_level_id').append(data.skill_level_id)
      $('#bio').append(data.bio)
      $('.logout_text').append(` ${data.email_address}`)
      $('#show_avatar_image').append(`<img src="${data.user_avatar}" height="250px" width="250px" class="center">`)
    })
  })
}

const editWindow = () => {
  const editCard = `
  <div id="edit_card">
    <table>
      <thead>
        <h4>Edit Profile</h4>
      </thead>
      <tbody id="edit_card_body">
        <tr class="row">
          <td class="col s3 m3 l3">Avatar</td>
          <td class="col s9 m9 l9">
          <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" style="display:none"></iframe>
            <form id="submit_avatar_form" action="users/${localStorage.user_id}/upload" method="post" encType="multipart/form-data" target="dummyframe" >
                <input id="input-file-now" type="file" name="user_avatar" class="dropify"  data-show-loader="true" data-allowed-formats="portrait square" data-max-file-size="3M" />
                </form>
          </td>
        </tr>
        <tr class="row">
          <td class="col s3 m3 l3">Phone</td>
          <td class="col s9 m9 l9">
            <input placeholder="XXX-XXX-XXXX" type="tel" id="phone_number">
          </td>
        </tr>
        <tr class="row">
          <td class="col s3 m3 l3">Bio</td>
          <td class="col s9 m9 l9">
            <div class="input-field col s12">
              <textarea id="bio-text" class="materialize-textarea white-text"></textarea>
              <label for="bio">Tell us about yourself.</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row center">
      <a id="submitButton" type="submit" class="modal-triger modal-close waves-effect waves-light btn">
        <p>save changes</p>
      </a>
    </div>
  </div>`

  $('#uploadForm2').submit(function(event) {
    event.preventDefault()
    alert('object updated')
  })

  $('#uploadForm').submit(function(event) {
    event.preventDefault()
    alert('object updated')
  })

  $('#myProfile').remove()
  $('#profile_card').append(editCard)

  $('#submitButton').click((event) => {
    event.preventDefault()
    $('#submit_avatar_form').submit()
    submitEdit()
  })

  $('.dropify').dropify({
    messages: {
      'default': 'Drag and drop a picture here or click. File size no larger than 3mb. Square images only.',
      'replace': 'Drag and drop or click to replace',
      'remove': 'Remove',
      'error': 'Ooops, something wrong happended.'
    }
  })

  $('#exit_edit').click((event) => {
    event.preventDefault()
    $.get('/token').done(data => {
      $.get(`/users/${data.cookie.user_id}`).done((results) => {
        return createAccountOverview(results)
      })
    })
  })
}

const submitEdit = () => {
  let phone_number = $('#phone_number').val()
  let bio = $('#bio-text').val()
  let data = {
    phone_number,
    bio,
  }

  for (i in data) {
    if (data[i] === '') {
      delete data[i]
    }
  }

  if (data === {} ) {
    $.get(`users/${localStorage.user_id}`).done( (results) =>{
      return createAccountOverview(results)
    })
  }

  $.get('/token', result => {
    user_id = result.cookie.user_id
  }).done((result) => {
    const id = result.cookie.user_id
    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      type: "PATCH",
      url: `/users/${id}`,
      dataType: "json",
      success: function(msg) {
        if (msg) {
        } else {
          alert("Cannot add to list.")
        }
      },
      data: JSON.stringify(data)
    }).done((final_result) => {
      createAccountOverview(final_result[0])
    })
  })
}

const createListeners = () => {
  $('#editButton').click(function(event) {
    event.preventDefault()
    editWindow()
  })
  $('#submitButton').click((event) => {
    event.preventDefault()
    submitEdit()
  })
}

const createLesson = (data) => {
  if (!data) {
    const lesson_name = $('#new_lesson_name').val()
    const date = $('#new_lesson_date').val()
    const time = $('#new_lesson_time').val()
    const location = $('#new_lesson_location').val()
    const cost = $('#new_lesson_cost').val()
    const instrument_type = $('#instrument_type').val()

    $.get('/token').done(result => {
      data = {
        user_client_id: null,
        user_instructor_id: result.cookie.user_id,
        lesson_name,
        date,
        time,
        location,
        cost
      }
      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        type: "POST",
        url: "/lessons",
        dataType: "json",
        success: function(msg) {
          if (msg) {
          } else {
            alert("Cannot add to list !");
          }
        },
        data: JSON.stringify(data)
      }).done((result) => {
      })
      .fail(($xhr) => {
        Materialize.toast('Lesson not create. Please fill out all fields.', 3000)
      })
    })
  }
}

const createLessonModal = () => {
  const html = `
  <div id="new_lesson_modal" class="grey darken-3 modal">
    <div class="modal-content">
      <div>
        <table>
          <thead>
            <h3 class="white-text center">Create Lesson</h3>
          </thead>
          <tbody id="createLessonBody">
            <form action="alert('Lesson Created!')">
              <tr class="row">
                <td class="col s3 m3 l3">Name</td>
                <td class="col s9 m9 l9">
                  <input placeholder="Enter lesson name." type="text" id="new_lesson_name" required="required">
                </td>
              </tr>
              <tr class="row">
                <td class="col s3 m3 l3">Date</td>
                <td class="col s9 m9 l9">
                  <input placeholder="Enter lesson date." type="date" id="new_lesson_date" required="required">
                </td>
              </tr>
              <tr class="row">
                <td class="col s3 m3 l3">Time</td>
                <td class="col s9 m9 l9">
                  <input placeholder="Enter lesson time." type="time" id="new_lesson_time" required="required">
                </td>
              </tr>
              <tr class="row">
                <td class="col s3 m3 l3">Location</td>
                <td class="col s9 m9 l9">
                  <input placeholder="Enter lesson location." type="text" id="new_lesson_location" required="required">
                </td>
              </tr>
              <tr class="row">
                <td class="col s3 m3 l3">Cost</td>
                <td class="col s9 m9 l9">
                  <input placeholder="Enter lesson cost." type="number" id="new_lesson_cost" required="required">
                </td>
              </tr>
              <tr class="row">
                <td class="col s3 m3 l3">Instrument</td>
                <td class="col s9 m9 l9">
                  <input placeholder="Enter instrument type." type="text" id="instrument_type">
                </td>
              </tr>
            </form>
          </tbody>
        </table>
        <div class="row center">
          <a href="#" id="createLessonSubmitButton" class="modal-close waves-effect waves-light btn">
            <p class="login-button">Create</p>
          </a>
        </div>
      </div>
    </div>
  </div>`

  $('#create_lesson_modal_insert').html(html)
  $('.modal').modal({
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '4%',
    endingTop: '10%',
  })

  $('#createLessonSubmitButton').click((event) => {
    event.preventDefault()
    createLesson()
  })
}

$(document).ready(() => {
  checkPrivileges()
  getAccount()
  $("#input-file-now").click(function(event) {
    event.preventDefault()
  })

  $('.modal').modal({
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '4%',
    endingTop: '10%',
  })

  $('.button-collapse').sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true,
    draggable: true,
  })

  createListeners()
})
