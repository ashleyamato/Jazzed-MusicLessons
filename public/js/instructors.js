$(document).ready(() => {

  $.ajax({
     headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
     type: "GET",
     url: "/users",
     dataType: "json",
     success: function (data) {
       if (data) {
         for (let i = 0; i < data.length; i++) {
           if (data[i].skill_level_id === 4) {
             $('.instructor-body').append(
               `
               <div class="row">
               <div class="col m3 l3"></div>
                 <div class="col s12 m6 l6">
                   <div class="instructor-card card">
                     <div class="card-image">
                       <img src="${data[i].user_avatar}">
                       <span class="card-title black">${data[i].first_name} ${data[i].last_name}</span>
                     </div>
                     <div class="card-content">
                       <p id="instructor_bio">${data[i].bio}</p>
                     </div>
                     <div class="card-action">
                       <a id="lessonAvail" href="lessons.html">Lesson availability</a>
                     </div>
                   </div>
                 </div>
               `
             )
           }
         }
       } else {
           alert("No teachers found.")
       }
     },
  })
  
  $(document).ready(() => {
    $('.modal').modal()

    $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true,
      })
  })
})
