const getAccount = () => {
  $.get('/token', result => {
    const id = result.cookie.user_id
    $.get(`/users/${id}`).done( (data) => {
      $('#first_name').append(data.first_name)
      $('#last_name').append(data.last_name)
      $('#phone_number').append(data.phone_number)
      $('#email_address').append(data.email_address)
      $('#skill_level_id').append(data.skill_level_id)
      $('#bio').append(data.bio)
    })
  })
}

const editAccount = (id, data) => {
  $.ajax({
     headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
     type: "PATCH",
     url: `/users/${id}`,
     dataType: "json",
     success: function (msg) {
         if (msg) {
         } else {alert("Cannot add to list !")}
     },
     data: JSON.stringify(data)
  });
}
const editWindow = () => {

  $.get('/token', result => {
    const id = result.cookie.user_id
  })
}

$(document).ready( () => {
  $('.editButton').click(function(event){
    event.preventDefault()
  })
})
