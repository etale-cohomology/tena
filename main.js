// Unless it's @window or @document, don't add event listeners to DOM elements outside of a @window.addEventListener('DOMContentLoaded', function(){}) ??
var print = console.log

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  dom
function getElementByName(elem, name){
  for(var i=0; i<elem.children.length; ++i){
    var child = elem.children[i]
    if(child.name===name) return child
  }
}

function htag_ini(args){  // HTML tag
  tagname  = args.tag   ? args.tag   : ''
  cssclass = args.class ? args.class : ''
  csstext  = args.style ? args.style : ''
  html     = args.html  ? args.html  : ''

  var elem           = document.createElement(tagname)
  elem.className    += ' ' + cssclass
  elem.style.cssText = csstext
  elem.innerHTML     = html
  return elem.outerHTML
}

Object.prototype.htags_add = function(html_elems){  // each elem of @html_elems is a raw HTML str
  for(var i=0; i<html_elems.length; ++i)
    this.innerHTML += html_elems[i]
}

Object.prototype.forEach = function(cb){
  for(var key in this){
    if(!this.hasOwnProperty(key))  continue
    cb(key,this[key])
  }
}

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  spinner: Hide everything until page load
window.addEventListener('DOMContentLoaded', function(){  // also works: `window.addEventListener('load', fn)`  // developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event  developer.mozilla.org/en-US/docs/Web/API/window/DOMContentLoaded_event
  document.getElementsByTagName('html')[0].style.visibility   = 'visible'  // also: @document.querySelector('html'), @document.documentElement
  document.getElementsByClassName('spinner')[0].style.display = 'none'     // To both HIDE an element and REMOVE the ELEMENT from the document layout, set the @display PROPERTY to @none instead of using @visibility
})

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  shortcuts, controls
window.addEventListener('keydown', function(ev){  // keyboard controls  // console.log(ev.key|ev.ctrlKey, ev.shiftKey, ev.ctrlKey, ev.altKey)  // 'ArrowRight', 'ArrowLeft', 'ArrowUp', or 'ArrowDown'
  if(ev.altKey && ev.key=='q')  window.location.href = '/'
  if(ev.altKey && ev.key=='g')  window.location.href = '/discover'
  if(ev.altKey && ev.key=='m')  window.location.href = '/trending'
  if(ev.altKey && ev.key=='l')  window.location.href = '/api'
  // if(ev.altKey && ev.key=='w')

  // if(ev.altKey && ev.key=='d')
  if(ev.altKey && ev.key=='s')  window.location.href = '/signup'
  if(ev.altKey && ev.key=='t')  window.location.href = '/login'
  if(ev.altKey && ev.key=='n')  window.location.href = '/store'
  if(ev.altKey && ev.key=='r')  flash_flash('I love you, Jesus', 'ok')

  if(ev.altKey && ev.key=='z')  sidebar_toggle()
  // if(ev.altKey && ev.key=='x')
  // if(ev.altKey && ev.key=='c')
  // if(ev.altKey && ev.key=='f')
  // if(ev.altKey && ev.key=='j')

  // ----------------------------------------------------------------
  // if(ev.altKey && ev.key=='b') flash_flash('Please, save me, Jesus', 'ko')
  // if(ev.altKey && ev.key=='y')
  // if(ev.altKey && ev.key=='u')
  // if(ev.altKey && ev.key=='u')
  // if(ev.altKey && ev.key=='v')
  // if(ev.altKey && ev.key=="'")

  // if(ev.altKey && ev.key=='i')
  // if(ev.altKey && ev.key=='a')
  // if(ev.altKey && ev.key=='e')
  // if(ev.altKey && ev.key=='o')
  // if(ev.altKey && ev.key=='h')

  // if(ev.altKey && ev.key=='k')
  // if(ev.altKey && ev.key=='p')
  // if(ev.altKey && ev.key==',')
  // if(ev.altKey && ev.key=='.')
  // if(ev.altKey && ev.key=='/')
})

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  flash alerts
function flash_flash(msg, cat='ko autohide', time=4000){  // @cat in ('ok', 'ko)
  var flashes     = document.getElementById('flashes')
  var flash       = document.createElement('div')
  flash.innerHTML = `<div class='flash anim ${cat}'><div class='msg'>${msg}</div><div class='fa fa-times action' onclick='flash_shift(this.parentNode,flashes)'></div></div>`  // onclick='this.parentNode.remove()'  onclick='this.parentNode.parentNode.removeChild(this.parentNode)'
  if(cat.indexOf('autohide')>=0) setTimeout(flash_shift.bind(null, flash,flashes), time)
  flashes.appendChild(flash)
}

function flash_shift(flash, flashes){
  flash.classList.add('hide')
  setTimeout(flash.remove.bind(flash), 400)
}

function flashes_hide(force=0, time=4000){  // Hide only the flash alerts flagged as @autohide, unless you FORCE all flash alerts to be hidden
  var flashes = document.getElementById('flashes');  if(!flashes) return
  for(var i=0; i<flashes.children.length; ++i){
    var flash = flashes.children[i]
    if(!force && flash.className.search('autohide')==-1)  continue
    setTimeout(flash_shift.bind(null, flash,flashes), time + i*250)
  }
}

window.addEventListener('DOMContentLoaded', function(){  // also works: `window.addEventListener('load', fn)`  // developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event  developer.mozilla.org/en-US/docs/Web/API/window/DOMContentLoaded_event
  flashes_hide(0,4000)
})

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  modal
function modals_autoclose(ev){
  for(var modal of document.getElementsByClassName('modal'))
    if(ev.target==modal)
      modal.style.display = 'none';
}
function modals_close(){
  for(var modal of document.getElementsByClassName('modal'))
    modal.style.display = 'none';
}
window.addEventListener('click', modals_autoclose, false)  // developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener  stackoverflow.com/questions/6348494/addeventlistener-vs-onclick

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  sidebar
var sidebar_hide = function(ev){
  var sidebar = document.getElementById('sidebar')
  if(!sidebar || sidebar.contains(ev.target) || ev.target==document.getElementById('navbar_icon')) return  // if(ev.target==sidebar || ev.target.parentNode==sidebar) return
  sidebar.classList.remove('active')
}

var sidebar_toggle = function(){  // Toggle sidebar
  var sidebar = document.getElementById('sidebar')
  sidebar.classList.toggle('active')
}

window.addEventListener('click', sidebar_hide)  // Hide sidebar when on outside clicks

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  form
function email_check(email){
  return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

function form_draw_submit(form, captcha=0){
  form.querySelector('[data-submit]').disabled               = true  // disable form button
  form.getElementsByClassName('spinner')[0].style.visibility = 'visible'

  if(!captcha) return
  var captcha = document.getElementById(form.id+'_captcha')
  for(var btn of captcha.getElementsByTagName('button'))  btn.disabled = true
  captcha.getElementsByClassName('spinner')[0].style.visibility = 'visible'
}

function forms_ini(){
  for(var form of document.getElementsByTagName('form')){
    form.addEventListener('keypress', function(ev){
      if(ev.key!='Enter' && ev.keyCode!=13 && ev.keyIdentifier!='U+000A') return
      ev.preventDefault()  // developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    })
    form.addEventListener('click', function(ev){
      if(ev.target.tagName!='BUTTON') return
      ev.preventDefault()  // developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    })
    form.addEventListener('submit',   function(ev){  ev.preventDefault()  })  // developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    form.addEventListener('invalid',  function(ev){  ev.preventDefault()  })  // developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  }
}

function form_input(div,ev, captcha=0){
  if(ev instanceof KeyboardEvent && ev.key!='Enter') return
  var form = div.parentNode

  // ---------------------------------------------------------------- input validation
  for(var input of form.getElementsByTagName('input')){
    if(input.required && !input.value){
      flash_flash(`${input.placeholder} can't be empty`)
      return
    }
  }

  var email = getElementByName(form, 'email')
  if(email && !email_check(email.value)){
    flash_flash('Please enter a valid email address')
    return
  }

  var password0 = getElementByName(form, 'password0')
  var password1 = getElementByName(form, 'password1')
  if(password0 && password1 && password0.value!=password1.value){
    flash_flash("Passwords don't match")
    return
  }

  // ---------------------------------------------------------------- dispatch commands
  if(captcha) form_captcha_unlock(form)
  else        form_apost(form, captcha)
}

function form_captcha_unlock(form, captcha=0){  // Merely unlock the captcha! No POST request yet!
  var captcha = document.getElementById(form.id+'_captcha')
  captcha.style.display = 'block'
  form.style.display    = 'none'
  getElementByName(captcha,'input').focus()
}

function form_apost(form, captcha=0){  // async post. ONCE the captcha has been unlocked & solved we can finally POST the form
  // ---------------------------------------------------------------- ini post args
  url = form.dataset.url ? form.dataset.url : window.location.pathname

  var fields = {}
  for(var input of form.getElementsByTagName('input'))
    fields[input.name] = input.value

  data = ''
  for(var k in fields)
    data += `${k}=${fields[k]}&`
  if(data[data.length-1]=='&') data = data.substr(0,data.length-1)

  // ---------------------------------------------------------------- send post request
  var req = new XMLHttpRequest()

  req.onload = function(ev){
    print(this)
    if     (this.status>=500){  flash_flash('Server error',        'ko autohide'); return  }
    else if(this.status>=400){  flash_flash('Client error',        'ko autohide'); return  }
    else if(this.status< 200){  flash_flash('Informational error', 'ko autohide'); return  }
    var data = JSON.parse(this.responseText)  // console.log(this.status, data)
    if(this.status==302)  window.location.href = data.redirect
  }

  req.open(form.dataset.method, url) // '/signup?csrf_token=123&email=a&password=0')
  req.setRequestHeader('content-type',     'application/x-www-form-urlencoded')
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  req.send(data)
  form_draw_submit(form,captcha)
}

window.addEventListener('DOMContentLoaded', function(){  // also works: `window.addEventListener('load', fn)`  // developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event  developer.mozilla.org/en-US/docs/Web/API/window/DOMContentLoaded_event
  forms_ini()  // window.addEventListener('load', function(){  forms_ini()  })
})

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  captcha
var CAPTCHA_IDIM     = 3
var CAPTCHA_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?@'
var CAPTCHA_TEXT     = ''

function captcha__gen(){  // Gen a random string over CAPTCHA_ALPHABET
  var captcha_txt = ''
  for(var i=1; i<=CAPTCHA_IDIM; ++i)
    captcha_txt += CAPTCHA_ALPHABET[Math.floor(Math.random() * CAPTCHA_ALPHABET.length)]
  return captcha_txt
}

function captcha_draw(form){
  var canvas    = form.getElementsByTagName('canvas')[0]
  var ctx       = canvas.getContext('2d')
  CAPTCHA_TEXT  = captcha__gen()
  ctx.font      = 'bold 3em Montserrat'

  var metrics   = ctx.measureText(CAPTCHA_TEXT)
  var width     = metrics.width
  var height    = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
  canvas.width  = width
  canvas.height = height
  ctx.font      = 'bold 3em Montserrat'  // For some reason you have to call this again?
  ctx.fillStyle = '#3240ff'
  ctx.fillText(CAPTCHA_TEXT, 0, canvas.height-metrics.fontBoundingBoxDescent)
}

function captcha_refresh(div,ev){  // Generate a new CAPTCHA
  var form = div.parentNode
  captcha_draw(form)
}

function captcha_handle(div,ev){
  var captcha = div.parentNode
  var input   = getElementByName(captcha, 'input')

  if(ev instanceof KeyboardEvent && ev.key!='Enter') return
  if(input.value==CAPTCHA_TEXT){
    var form = document.getElementById(captcha.id.replace('_captcha',''))  // BUG! We should really only be replacing the LAST occurrence of @_captcha
    form_apost(form,1)
  }else
    flash_flash('Incorrect', 'ko')
}

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  str
String.prototype.splitfirst = function(c){
  var pos = this.indexOf(c)
  return [this.slice(0,pos), this.slice(pos+c.length,this.len)]
};

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  secrets
function rot47(x){
  var s = []
  for(var i=0; i<x.length; ++i){
    var j = x.charCodeAt(i)
    if((33<=j)&&(j<=126))  s[i] = String.fromCharCode(33 + ((j+14)%94))
    else                   s[i] = x[i]
  }
  return s.join('')
}

function encrypt(str){  return rot47(str)  }
function decrypt(str){  return rot47(str)  }

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  promisifying XMLHttpRequest
function acurl(method='GET', url, headers=[], data='', args={}){  // @headers is a list of strings in the form (eg.) `user-agent: hello`
  return new Promise(function(resolve,reject){  // herongyang.com/Free-Web-Service/REST-HTTP-Request-Response-Raw-Data.html  developer.mozilla.org/en-US/docs/Web/HTTP/Messages
    var req = new XMLHttpRequest()  // developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    req.open(method, url)  // @XMLHttpRequest.response is useless; it works if you set @XMLHttpRequest.responseType to, eg., 'json', but it's not part of the (simple) HTTP, but of the (impossibly complicated) "browser protocol"...

    req.onload = function(ev){
      if     (this.status>=500){  flash_flash('Server error',        'ko autohide'); return  }
      else if(this.status>=400){  flash_flash('Client error',        'ko autohide'); return  }
      else if(this.status< 200){  flash_flash('Informational error', 'ko autohide'); return  }
      else if(this.status==302) if(this.getResponseHeader('loc')=='') window.location.reload();  else window.location.href=this.getResponseHeader('loc')   // developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location  rfc-editor.org/rfc/rfc2616#section-14.30  // ['','.'].indexOf(req.getResponseHeader('loc'))>=0

      var response     = {
        status:  this.status,
        url:     this.responseURL,
        headers: this.getAllResponseHeaders(),  // @XMLHttpRequest.getAllResponseHeaders() returns all the headers as a str
        body:    0<=this.getResponseHeader('content-type').indexOf('application/json') ?  JSON.parse(this.responseText) : this.responseText,  // application/x-www-form-urlencoded  application/json  multipart/form-data
        args:    args,
      }

      // print(this.getResponseHeader('loc'))
      // print(this.getResponseHeader('content-type'))
      // BUG! we use 'loc' instead of 'location' because Werkzeug doesn't seem to like the 'location' header
      resolve(response)
    }  // called also on 404; resolve the promise with the response text
    req.onerror = function(ev){  // When is this called? developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/error_event
      console.log('\x1b[91mERROR\x1b[0m  network')
    }
    // req.onloadend = function(ev){}
    // req.onreadystatechange = function(ev){  // @XMLHttpRequest.loadend triggers after @XMLHttpRequest.load and @XMLHttpRequest.error
    //   if(this.readyState!==XMLHttpRequest.DONE || (this.status<200 || 400<=this.status)) return  // developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
    // }

    req.setRequestHeader('x-requested-with', 'xmlhttprequest')  // stackoverflow.com/questions/17478731  markitzeroday.com/x-requested-with/cors/2017/06/29/csrf-mitigation-for-ajax-requests.html  // req.setRequestHeader('access-control-allow-origin', '*')
    for(var header of headers){
      var h = header.splitfirst(':')
      req.setRequestHeader(h[0].trim(), h[1].trim())
    }

    req.send(data)
  })
}

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  fmt
function fmtf(x, prec=3){
  var i = Math.floor(x)  // integer part
  var f = x - i          // fractional part
  return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') + f.toFixed(prec).slice(1)
}

function fmtib(x, nbits=32){  // format integer as binary  // x must in [-1<<31 .. 1<<31)
  if(x < -(2**31) || (2**31) - 1 < x)  console.log('number out of bounds')
  for(var flag=0, shifted=x, y=''; flag<32; ++flag, y += String(shifted>>>31), shifted<<=1);
  // y = y.replace(/\B(?=(.{8})+(?!.))/g, ' ') // add spaces every 8 bits
  return y.slice(32-nbits)
}

// ----------------------------------------------------------------------------------------------------------------------------# @blk1  draw
var draw_chart_line = function(data_y,data_labels, id, rgba, sparkline=false, draw_labels=true){
  var canvas = document.getElementById(id);  if(!canvas) return
  var ctx    = canvas.getContext('2d')

  if(!sparkline){
    if(0.25*screen.width < 480) canvas.width = 0.90*canvas.parentNode.clientWidth
    else                        canvas.width = 0.25*screen.width
    canvas.height = canvas.width * 1080/1920
  }else{
    canvas.width  = 150
    canvas.height = 30
  }

  var min_y = Math.min.apply(Math, data_y)
  var max_y = Math.max.apply(Math, data_y)
  var ty    = (canvas.height-0) / (max_y-min_y)  // transform-Y
  for(var i=0; i<data_y.length; ++i)
    data_y[i] = canvas.height - (data_y[i]-min_y)*ty

  var dx        = canvas.width / (data_y.length-1)
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0*dx, data_y[0])
  for(var i=1; i < data_y.length-2; ++i){
    var xc = ( dx*(i+0) +  dx*(i+1)) / 2  // midpoint
    var yc = (data_y[i+0] + data_y[i+1]) / 2  // midpoint
    ctx.quadraticCurveTo(i*dx, data_y[i], xc, yc)
  }
  ctx.quadraticCurveTo((i+0)*dx, data_y[i+0], (i+1)*dx, data_y[i+1])  // curve through the list two points
  ctx.strokeStyle = rgba
  ctx.stroke()

  if(!sparkline && draw_labels){
    ctx.font      = '1em Times New Roman';
    ctx.fillStyle = '#2a3f58';  // rgba

    for(var i=1; i<data_y.length; ++i)
      ctx.fillText(data_labels[i],  i*dx,canvas.height)

    var NSTEPS = 5
    var dy0 = (canvas.height-    0)/NSTEPS
    var dy1 = (max_y        -min_y)/NSTEPS
    for(var i=1; i<NSTEPS; ++i)
      ctx.fillText(Math.floor(i*dy1),  0, canvas.height - (i*dy0))
  }
}

var data   = [10, 20, 10, 30, 10, 40, 40]
var labels = ['10-08', '10-09', '10-10', '10-11', '10-12', '10-13', '10-14']
draw_chart_line(data,labels, 'chartf0', '#3240ff')

var data   = [10, 20, 10, 30, 10, 40, 40]
var labels = ['10-08', '10-09', '10-10', '10-11', '10-12', '10-13', '10-14']
draw_chart_line(data,labels, 'chart00', '#2dce89', true)
draw_chart_line(data,labels, 'chart01', '#ff8baa', true)
