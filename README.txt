Load JavaScript asynchronously using the most browser compatible method. The
element for each JavaScript file to be loaded asynchronously will be generated
dynamically after the window load event using the following basic method:

(function() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = script.data;
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
})();


### How to load a JavaScript file asynchronously

Using this module, you can specify a script to be loaded asynchronously in two
basic ways:

1. By adding "async_js" => TRUE to the options array in drupal_add_js().
2. By calling add_async_js("path/to/your/script.js") which bypasses
drupal_add_js(), gets you the same result, and may be a touch faster.


### Additional functionality

In addition to loading scripts asynchronously, this module includes the
following functionality:

- Callback functions: Specify a callback function to be fired once the script 
has loaded. This can be done either by specifying "async_callback" =>
"your_function_name" in drupal_add_js() or with
add_async_js("path/to/your/script.js", "your_function_name"). Your callback
function must exist in the global scope.

- Fade-in effect: When specifying a script to be loaded asynchronously, you can
specify html elements to fade in after a delay and in unison. This can be done
either by specifying "async_fade" => array(".array", "#of", ".jQuery",
"#selectors") in drupal_add_js() or with add_async_js("path/to/your/script.js",
"your_function_name", array(".array", "#of", ".jQuery", "#selectors")). The
default delay is 1 second. This can be changed by editing the conf variable
"async_js_timeout". NOTE: The fade-in effect will be applied universally to all
elements defined in this way on a single page.

- Final callback: You may add a final callback function to be fired after all
asynchronous scripts have been successfully loaded by editing the
"async_js_final_callback" conf variable. Your callback function must exist in
the global scope.


### Similar modules

- Async script shim is a very similar module for Drupal 8. It does not support
callbacks or fade-in effects.

- Script.JS uses the $script.js library and loads all scripts asynchronously
rather than allowing you to specify scripts.

- HeadJS uses the HeadJS library and loads all scripts asynchronously rather
than allowing you to specify scripts.
