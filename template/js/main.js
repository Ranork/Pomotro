
//* Construction variables
const tour_time = 25 * 60       // 25 min in seconds
const sm_break_time = 5 * 60    // 5 min in seconds
const lg_break_time = 15 * 60   // 15 min in seconds
const max_tour = 4              // cycle

//* Dynamic variables
var cur_time = 0                // Current time dynamic variable
var cur_tour = 0                // Current tour dynamic variable
var playing = false             // Playing or stopped tracker dynamic var


//* Start Function
async function start() {
  playing = true                // Set the timer playing
  
  while (playing) {             // Player Cycle

    cur_time++                  // add 1 second

    let seconds = tour_time - cur_time                      // calculate remaining seconds
    setById('time', time_str_convert(seconds))              // write to timer
    setById('period_expl', 'FOCUS')

    let ratio = (cur_time / tour_time) * 100                // calculate remaining progress ratio
    $('#prog-bar').css('width', ratio + '%')                // write to timer


    if (cur_time > tour_time) {                             // if the tour is complated
      cur_tour++                                            // add 1 to current tour
      setById('period', cur_tour + "/" + max_tour)          // write to timer
      setById('period_expl', (cur_tour % max_tour === 0) ? 'LONG BREAK' : 'SHORT BREAK')
      
      $('#prog-bar').addClass('progress-bar-break')         // change progress bar style

      cur_time = 0;                                         // set current time to 0
      let break_time = (cur_tour % max_tour === 0) ? lg_break_time : sm_break_time   // get break time (long or short)
      while (cur_time < break_time && playing) {            // Break cycle
        cur_time++                                          // add 1 second

        let seconds = break_time - cur_time                 // calculate rem seconds
        setById('time', time_str_convert(seconds))          // write to timer
  
        let ratio = (100 - (cur_time / break_time) * 100)   // calculate progress ratio (inversed)
        $('#prog-bar').css('width', ratio + '%')            // write to timer
        await new Promise(r => setTimeout(r, 1000));        // Sleep 1 second
      }

      
      $('#prog-bar').removeClass('progress-bar-break')    // clear progress bar style
      setById('time', time_str_convert(tour_time))        // write tour time to timer
      setById('period_expl', 'FOCUS')
      cur_time = 0;                                       // set current time to 0

    }

    await new Promise(r => setTimeout(r, 1000));          // Sleep 1 second
  }
}

//* Stop Function
async function stop() {
  cur_time = 0                                      // set current time to 0
  playing = false                                   // stop player cycle

  setTimeout(() => {
    $('#prog-bar').css('width', '0%')               // set progress to 0
    setById('period_expl', 'START')
    setById('time', time_str_convert(tour_time))    // set timer to tour time
  }, 200)                                           // make it delayed
}


//* Start/Stop Action
function act_btn() {
  if (!playing) {
    start()
    $('#act_btn').html('<i class="fa-solid fa-stop"></i>')
  }
  else {
    stop()
    $('#act_btn').html('<i class="fa-solid fa-play"></i>')
  }
}
