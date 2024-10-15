var FUNNEL_ID = document.head.querySelector("meta[name=funnel_id]").content;
var SITE_ID;
if (document.querySelectorAll('meta[name=site_id]').length > 0) {
  // alert('Its here!');
  var SITE_ID = document.head.querySelector("meta[name=site_id]").content;
}
var FUNNEL_PAGE_ID = document.head.querySelector(
  "meta[name=funnel_page_id]"
).content;
var BASE_URL = "https://api.myflxfnls.com";
var path = new URL(document.location);
var pathname = window.location.pathname;
var params = path.searchParams;
var ai = params.get("ai"),
  pi = params.get("pi"),
  ti = params.get("ti"),
  fid = params.get("fid"),
  product_id = params.get("id"),
  ffid = params.get("ffid");
(utm_ffid = params.get("utm_ffid")), (FT_UUID = "uuid_" + path.host);
pageTypeP = "DEFAULT";

ftphonenumber = function (inputtxt) {
  var phoneno = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  if (inputtxt.match(phoneno)) return false;
  else return true;
};
getCookie = function (cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
delete_cookie = function (name) {
  document.cookie = name + "=; Path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
};
delete_cookies = function (clist) {
  clist.forEach(function (key) {
    document.cookie = key + "=; Path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  });
};
setCookie = function (clist) {
  clist.forEach(function (item, index) {
    document.cookie =
      item.key +
      "=" +
      item.value +
      "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  });
};
// addCookieToPopup = function (t, offset) {
//     now = new Date();
//     local_time = now.getTime();
//     local_offset = now.getTimezoneOffset() * 60000;
//     utc = local_time + local_offset;
//     return new Date(utc + 3600000 * offset);
// };
getTimerDate = function (t, offset) {
  var d = t ? new Date(t) : new Date();
  var localTime = d.getTime();
  var localOffset = d.getTimezoneOffset() * 60000;
  var utc = localTime + localOffset;
  var timer_res = utc + 3600000 * offset;
  return new Date(timer_res);
};
generateUniqueId = function (event) {
  return `_${Date.now().toString(36)}${Math.floor(
    Number.MAX_SAFE_INTEGER * Math.random()
  ).toString(36)}`;
};

var utmkeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
];

getUTMtracking = function (params, data, utmId) {
  var utm_s = params.get("utm_source");
  if (utm_s != null) {
    utmkeys.forEach(function (number) {
      var t = params.get(number);
      if (t != null) data[number] = t;
    });

    var utm_count = getCookie("utm_count_" + utmId);
    var utm_ad = getCookie("utm_append_" + utmId);

    data["touch_point"] = utm_count;
    data["utm_flow"] = utm_ad;
  }
  return data;
};
setUTMtracking = function (params, utmId) {
  var utm = params.get("utm_source");
  if (utm != null) {
    var utmObj = {};
    utmkeys.forEach(function (number) {
      var t = params.get(number);
      if (t != null) utmObj[number] = t;
    });

    var lutm = getCookie("lus_" + utmId);
    console.log(utm);
    var utm_count = 0;
    var utm_append = "";
    if (lutm !== "" && lutm != utm) {
      utmObj["lus"] = lutm;
      var utm_count_in = getCookie("utm_count_" + utmId);

      utm_count = parseInt(getCookie("utm_count_" + utmId)) + 1;
      console.log(JSON.parse(getCookie("utm_append_" + utmId)));
      var newUTM = JSON.parse(getCookie("utm_append_" + utmId));
      console.log(newUTM);
      newUTM.push(utm);
      console.log(utm);
      console.log(newUTM);
      utm_append = newUTM;
    } else if (lutm !== "" && lutm == utm) {
      utm_count = parseInt(getCookie("utm_count_" + utmId));
      utm_append = JSON.parse(getCookie("utm_append_" + utmId));
    } else {
      utm_count = 1;
      utm_append = [utm];
      console.log(utm_append);
    }

    setCookie([
      {
        key: "utag_main_" + utmId,
        value: JSON.stringify(utmObj).replace(/%/g, "_"),
      },
      {
        key: "ft_params_" + utmId,
        value: params.toString().replace(/%/g, "_"),
      },
      {
        key: "lus_" + utmId,
        value: utmObj.utm_source,
      },
      {
        key: "lus_utm_id_" + utmId,
        value: utmObj.utm_id,
      },
      //UTM Count
      {
        key: "utm_count_" + utmId,
        value: utm_count,
      },
      //UTM append
      {
        key: "utm_append_" + utmId,
        value: JSON.stringify(utm_append),
      },
    ]);
  }
  //return res;
};

function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return dateTime;
}

// Usage



// ********************************
//Flexi UTM Tracking start
// ********************************
if (!getCookie(FT_UUID))
  setCookie([
    {
      key: FT_UUID,
      value: generateUUID(),
    },
  ]);

ftEprams = function (params, item) {
  var obj = {
    type: item.type,
  };
  var s = params.get(item.source);
  if (s) obj["source"] = s;
  var t = params.get(item.targeting);
  if (t) obj["targeting"] = t;
  var c = params.get(item.creative);
  if (c) obj["creative"] = c;
  var m = params.get(item.medium);
  if (m) obj["medium"] = m;
  obj["datestamp"] = currentTime = getDateTime();
  return obj;
};
ftobjectsEqual = function (o1, o2) {
  return (
    o1 &&
    Object.keys(o1).length === Object.keys(o2).length &&
    Object.keys(o1).every((p) => p === "datestamp" || o1[p] === o2[p])
  );
};

var ffskeys = [
  {
    type: "ads",
    source: "ff_source",
    targeting: "ff_targetingid",
    creative: "ff_adid",
    medium: "ff_medium",
  },
  {
    type: "com",
    source: "ff_comchannel",
    targeting: "ff_complace",
    creative: "ff_comcon",
  },
  {
    type: "org",
    source: "ff_orgsource",
    targeting: "ff_orgsource",
    creative: "ff_orgcon",
  },
  // {
  //     type: "utm",
  //     source: "utm_source",
  //     targeting: "utm_source",
  //     Creative: "utm_id",
  // }, //UTM Track
];
function fftracking(ctset, params, item) {
  var plh_lnt = ctset.tp.length - 1;
  //ctset.params = params ? params.toString() : ""; //For Params
  ctset.params = params ? ftEprams(params, item) : ""; //For Params

  var t = params ? ftEprams(params, item) : item;
  if (!ftobjectsEqual(ctset.tp[plh_lnt], t)) ctset.tp.push(t);
  setCookie([
    {
      key: "flexiTracking_" + FUNNEL_PAGE_ID,
      value: encodeURIComponent(JSON.stringify(ctset)),
    },
  ]);
}
let ftrk = getCookie("flexiTracking_" + FUNNEL_PAGE_ID);
let ctset = ftrk ? JSON.parse(ftrk) : "";
if (!ctset) {
  ctset = {
    params: "",
    tp: [],
  };
  ffskeys.forEach(function (item) {
    var source = params.get(item.source);
    if (source != null) fftracking(ctset, params, item);
  });
} else {
  let s_test = true;
  ffskeys.forEach(function (item) {
    var source = params.get(item.source);
    if (source != null) {
      fftracking(ctset, params, item);
      s_test = false;
    }
  });
  if (s_test) fftracking(ctset, "", { type: "flexi", source: "flexi" });
}
// **********************************
//Flexi UTM Tracking end
// ***********************************

$(document).ready(function () {
  callHTTP = function (
    url,
    data,
    callback, // How can I use this callback?,
    type
  ) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // if (xhr.readyState == 4) {
      callback(this); // Another callback here
      // }
    };
    xhr.open(type ? type : "POST", url);
    if (type !== "get") {
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      //  xhr.setRequestHeader("authorizationToken", path.host);
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.send(data);
  };

  mailValidation = function (val) {
    // var expr =
    //     /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    var expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    var mode = false;
    if (!expr.test(val)) mode = true;
    if (val.includes("+")) mode = false;
    return mode;
  };

  validatePhone = function (phone) {
    if (typeof phone == "undefined") return true;
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (regex.test(phone)) {
      return true;
    } else {
      return false;
    }
  };

  formvalidation = function (formId, $formData) {
    var fail = false;
    var errList = {};
    formErrMsgShowUp(formId, {});

    function inputValidation(obj, name, value, errList) {
      if (name == "email") {
        value.trim().replace(/ /g, "");
        if (mailValidation(value)) {
          obj.addClass("gjs-ip-brdrclr");
          fail = true;
          errList.email = ["Please enter a valid email address"];
        }
        if (obj.prop("required")) $formData["erq_mode"] = 1;
      } else if (name == "phone") {
        var temp = ftphoneVerify(obj);
        $formData[name] = temp.no;
        if (!temp.isValid) {
          fail = true;
          errList.phone = [temp.err];
        }
        if (temp.dc) $formData["ft_countrycode"] = temp.dc;
        return false;
      }
    }

    $("#" + formId)
      .find("select, textarea, input")
      .each(function () {
        var name = $(this).attr("name");
        var type = $(this).attr("type");

        var value = $(this).val().trim();

        if (name == "pricing_id") {
          var price = $("input[name=pricing_id]:checked", "#" + formId).val();

          if (verifier(price)) {
            errList.pricing_id = ["Please select at least one pricing option"];
            fail = true;
          }
        }

        $(this).removeClass("gjs-ip-brdrclr");
        if ($(this).prop("required")) {
          // If input require
          if (!value) {
            let dataRequired = $(this).attr("data-required"); //For autoResponder code
            if (dataRequired == "false") {
            } else {
              fail = true;
              $(this).addClass("gjs-ip-brdrclr");
              errList["empty"] = ["Please fill in all the required fields"];
            }
          } else inputValidation($(this), name, value, errList);
        } else if (value) {
          inputValidation($(this), name, value, errList);
        }
      });

    //submit if fail never got set to true
    if (fail) formErrMsgShowUp(formId, errList);
    var res = { fail: !fail, formData: $formData };
    return res;
  };

  // function ftButton(sId, hId) {
  //     (document.getElementById(sId).style.display = "inline-block"),
  //         (document.getElementById(hId).style.display = "none");
  // }
  //commonGetInputs
  verifier = function (value) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  getAssignedData = function ($dataObject) {
    if (!verifier($('input[name="product_id"]').val()))
      $dataObject["product_id"] = $('input[name="product_id"]').val();
    if (!verifier($('input[name="ffid"]').val()))
      $dataObject["ffid"] = $('input[name="ffid"]').val();
    if (!verifier($('input[name="fid"]').val()))
      $dataObject["fid"] = $('input[name="fid"]').val();
    return $dataObject;
  };
  btnLoader = function (obj, pObj) {
    var temp = obj.find(".fa-spin");
    if (temp.length != 0) return false;
    if (pObj) pObj.addClass("gjs-btneffect");
    else obj.addClass("gjs-btneffect");
    obj.append(`<i class="fas fa-spinner fa-spin ml-1"></i>`);
    return true;
  };
  removebtnLoader = function (obj, pObj) {
    setTimeout(function () {
      if (pObj) pObj.removeClass("gjs-btneffect");
      else obj.removeClass("gjs-btneffect");
      obj.find(".fa-spin").remove();
    }, 1200);
  };
  getAllFormsData = function ($dataObject) {
    $("body")
      .find("form")
      .each(function (index) {
        $fData = $(this).serializeArray();
        $fData.map(function (val) {
          $dataObject[val.name] = val.value;
        });
      });
    return $dataObject;
  };
  formSucssMsgShowUp = function (formId, curObj, msg) {
    setTimeout(function () {
      curObj.removeClass("skeleton-loader");
      //curObj.removeClass("gjs-btneffect");
      // curObj.find(".fa-spin").fadeOut("slow", function () {
      //     $(this).remove();
      // });
      curObj.find(".fa-spin").remove();
    }, 500);

    var fObj = $("#" + formId);
    if (fObj) {
      fObj[0].reset();
      if (!verifier(msg)) {
        fObj.find(".ft-formsuc-block").remove();
        fObj.find(".ft-formerr-block").remove();

        var html = `<div class="ft-formsuc-block ft-fadein">
                    <span>${msg}</span>
                    <button type="button" class="close formsuc-close">
                    <span>X</span>
                    </button>
                </div>`;
        fObj.prepend(html);
      }
    }
  };
  actionUrlCheck = function (url) {
    try {
      let domain = new URL(url);
      domain = domain.hostname.replace("www.", "");
      return domain;
    } catch (err) {
      return false;
    }
  };
  getUA = function () {
    let device = "Unknown";
    const ua = {
      "Generic Linux": /Linux/i,
      Android: /Android/i,
      BlackBerry: /BlackBerry/i,
      Bluebird: /EF500/i,
      "Chrome OS": /CrOS/i,
      Datalogic: /DL-AXIS/i,
      Honeywell: /CT50/i,
      iPad: /iPad/i,
      iPhone: /iPhone/i,
      iPod: /iPod/i,
      macOS: /Macintosh/i,
      Windows: /IEMobile|Windows/i,
      Zebra: /TC70|TC55/i,
      UCBrowser: /UCBrowser/i,
    };
    Object.keys(ua).map(
      (v) => navigator.userAgent.match(ua[v]) && (device = v)
    );
    return device;
  };
  formErrMsgShowUp = function (formId, fErr, curObj) {
    document.querySelector("#" + formId).scrollIntoView({
      behavior: "smooth",
    });
    if (curObj) {
      setTimeout(function () {
        curObj.removeClass("skeleton-loader");
      }, 0);
    }

    var tArray = [];
    Object.keys(fErr).forEach(function (key, value) {
      var res = {
        type: key,
        msg: fErr[key][0],
      };
      tArray.push(res);
    });

    var fObj = $("#" + formId);
    if (fObj) {
      fObj.find(".ft-formsuc-block").remove();
      fObj.find(".ft-formerr-block").remove();
      //fObj.find(".gjs-ip-brdrclr").removeClass("gjs-ip-brdrclr");

      if (tArray.length != 0) {
        var liInner = ``;
        tArray.forEach(function (item, index) {
          fObj.find(`input[name=${item.type}]`).addClass("gjs-ip-brdrclr");
          liInner += `<li>${item.msg}</li>`;
        });

        var html = `<div class="ft-formerr-block"><ul>${liInner}</ul></div>`;
        fObj.prepend(html);
      }
    }
  };

  $(document).on(
    "click",
    "img[data-action='url'],.ft-icon[data-action='url']",
    function () {
      ($url = $(this).attr("data-url")),
        ($target = $(this).attr("data-target")
          ? $(this).attr("data-target")
          : "_self"),
        window.open($url, $target);
    }
  ),
    ($climg = $("img[data-action='calls'],.ft-icon[data-action='calls']")),
    $climg.each(function () {
      $url = $(this).attr("href");
      $(this).wrap(`<a href="${$url}"></a>`);
    }),
    $(document).on(
      "click",
      "img[data-action='popup'],.ft-icon[data-action='popup']",
      function () {
        var pop_id = $(this).attr("data-popup");
        $("#" + pop_id).addClass("show");
      }
    ),
    $(document).on("click", ".ff-modal-pop-close", function (event) {
      event.stopPropagation();
      var id = $(this).attr("data-popid");
      $("#" + id)
        .find(".ff-modal-div")
        .addClass("fmc-ani-down")
        .delay(300)
        .queue(function () {
          $(this).removeClass("fmc-ani-down").dequeue();
        });
      setTimeout(function () {
        var pObj = $("#" + id);
        if (pObj.length !== 0) {
          pObj.removeClass("show");
          addCookieToPopup(pObj);
        }
      }, 250);
    }),
    $(document).on("click", "div[data-popupbgclose='yes']", function () {
      $(this).removeClass("show");
      addCookieToPopup($(this));
    }),
    $(document).on("click", "div[data-popupbgclose='no']", function (event) {
      // alert();
      // $(this).find('.ff-modal-div').addClass("fmc-scale").delay(1000).removeClass("fmc-scale");

      $(this)
        .find(".ff-modal-div")
        .addClass("fmc-scale")
        .delay(100)
        .queue(function () {
          $(this).removeClass("fmc-scale").dequeue();
        });
    }),
    $(document).on("click", ".ff-modal-content", function (event) {
      event.stopPropagation();
    }),
    $(document).on("click", "a[href*='#open-popup']", function () {
      ($id = $(this).attr("data-popup")), $("#" + $id).addClass("show");
      return false;
    }),
    $(document).on("click", ".formsuc-close", function () {
      $(this).parent().fadeOut();
    }),
    // *******************************************
    // popup start close
    // ********************************************

    // ***********
    // Nav start
    // ***********
    $(document).on("click", ".ft-navbar-toggler", function () {
      $sticky = $(".ft-stickytop").first();
      if ($sticky.length != 0) $sticky.addClass("ft-stickytop-box");
      $(this).next().toggleClass("show");
    }),
    // $(".ft-dropdown").hover(
    //     function () {
    //         var color = $(this).css("background-color");
    //         $(this).prev().css("background-color", color);
    //     },
    //     function () {
    //         $(this).prev().removeAttr("style");
    //     }
    // ),
    // ***********
    // Nav close
    // ***********

    $(document).on(
      "click",
      "a[href*='#scroll-'],img[data-imagelink*='#scroll-'],.ft-icon[data-imagelink*='#scroll-']",
      function () {
        $id = $(this).attr("data-ftscrollid").replace("#", "");
        if (typeof $id !== "undefined") {
          const element = document.getElementById($id);
          element.scrollIntoView(true);

          var ct = $(".ft-stickytop:visible");
          if (ct.length != 0) {
            var shi = ct.outerHeight();
            window.scrollTo(0, window.scrollY - shi);
          }
          $(this).closest(".navbar-collapse").removeClass("show");
        }
        return false;
      }
    ),
    $(document).on("click", "a[href*='#product']", function () {
      var curObj = $(this);
      $product_id = $(this).attr("data-ft-productData");
      //Plausible Code cookie
      setCookie([
        {
          key: "sales_page_id_" + $product_id,
          value: FUNNEL_PAGE_ID,
        },
      ]);
      var flexi_tracking = getCookie("flexiTracking_" + FUNNEL_PAGE_ID);

      if (flexi_tracking != "") {
        setCookie([
          {
            key: "flexi_tracking" + $product_id,
            value: flexi_tracking,
          },
        ]);
      }
      //Plausible Code cookie
      //Split Test Code Cookie starts here
      if (getCookie("split_test").length > 0 && getCookie("split_test") !== null) {
        var controlPage = getCookie("control_page").split("/");
        if (pathname + "/" == getCookie("split_slug")) {
          // $dataObject["split_test"] = 1;
          // $dataObject["control_page_id"] = controlPage[1];
          // $dataObject["control_page_funnel_id"] = controlPage[0];
          setCookie([
            {
              key: "split_sales_product_" + $product_id,
              value: 1,
            },
          ]);
        }
      }
      //Split Test Code Cookie ends here
      // ($checkout_url = $(this).attr("data-checkout-url"));
      //if (!verifier($checkout_url)) window.location.href = $checkout_url;
      // else {
      if ($(curObj).hasClass("skeleton-loader")) return false;
      curObj.addClass("skeleton-loader");

      $newObject = {
        product_id: $product_id ? $product_id : "",
        type: "product",
      };
      var data = JSON.stringify($newObject);
      callHTTP(BASE_URL + "/checkout", data, function (res) {
        if (res.readyState === 4) {
          curObj.removeClass("skeleton-loader");
          var response = JSON.parse(res.responseText);
          window.location.href = response.body.checkout_page_url;
        }
      });
      //}
      return !1;
    }),
    $(document).on("click", "a[href*='#funnel']", function () {
      var curObj = $(this);
      if ($(curObj).hasClass("skeleton-loader")) return false;
      curObj.addClass("skeleton-loader");

      // var btnApp = $(this).find(".ffbtntxt");
      // if (!btnLoader(btnApp, curObj)) return false; //Multi Acation prevent

      ($product_id = $(this).attr("data-ft-productData")),
        ($type = $(this).attr("href") == "#funnel" ? "funnel" : "product"),
        ($funnel_id = $(this).attr("data-ft-funnelData")),
        ($funnel_product_id = $(this).attr("data-funnel_product_id"));

      //Plausible Code cookie
      setCookie([
        {
          key: "sales_page_id_" + $product_id,
          value: FUNNEL_PAGE_ID,
        },
      ]);
      var flexi_tracking = getCookie("flexiTracking_" + FUNNEL_PAGE_ID);

      if (flexi_tracking != "") {
        setCookie([
          {
            key: "flexi_tracking" + $product_id,
            value: flexi_tracking,
          },
        ]);
      }
      //Plausible Code cookie

      $newObject = {
        product_id: $product_id ? $product_id : "",
        funnel_id: $funnel_id ? $funnel_id : "",
        funnel_product_id: $funnel_product_id ? $funnel_product_id : "",
        type: $type,
      };
      var data = JSON.stringify($newObject);

      callHTTP(BASE_URL + "/checkout", data, function (res) {
        if (res.readyState === 4) {
          curObj.removeClass("skeleton-loader");
          var response = JSON.parse(res.responseText);
          window.location.href = response.body.checkout_page_url;
        }
      });

      // var xhr = new XMLHttpRequest();

      // xhr.addEventListener("readystatechange", function () {
      //     if (this.readyState === 4) {
      //         // removebtnLoader(btnApp, curObj); //remove loader after res
      //         curObj.removeClass("skeleton-loader");

      //         console.log(this.responseText);
      //         console.log(typeof this.responseText);
      //         var response = JSON.parse(this.responseText);
      //         // console.log(this.getResponseHeader('Set-Cookie'));
      //         // window.location.href = response.checkout_page_url + "?id=" + response.product_id;
      //         window.location.href = response.body.checkout_page_url;

      //         // curObj.removeClass("gjs-btneffect");
      //         // curObj.find(".fa-spin").remove();
      //     }
      // });

      // xhr.open("POST", "https://dev.myflxfnls.com/checkout");
      // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      // xhr.setRequestHeader("authorizationToken", path.host);
      // xhr.setRequestHeader("Content-Type", "application/json");

      // xhr.send(data);
      return !1;
    }),
    //No thanks button
    $(document).on("click", "a[href*='#no-thanks']", function () {
      var curObj = $(this);
      $dataObject = {
        product_id: $(this).attr("data-ft-productdata"),
        fid: $(this).attr("data-funnel_product_id"),
        ffid: $(this).attr("data-ft-funneldata"),
      };
      var data = JSON.stringify($dataObject);

      if (curObj.hasClass("gjs-btneffect")) return false;
      curObj.addClass("gjs-btneffect");

      callHTTP(BASE_URL + "/no-thanks", data, function (res) {
        if (res.readyState === 4) {
          var response = JSON.parse(res.responseText);
          var url = response.body.sales_url;

          if (!verifier(url)) window.location.href = url;
          curObj.removeClass("gjs-btneffect");
        }
      });
      return !1;
    }),
    $(document).on("click", "a[href*='#submit']", async function () {
      var formId = $(this).attr("data-formid");
      var clset_id = $(this).closest("form").attr("id");
      if (formId !== clset_id) formId = clset_id;

      $dataObject = {};
      if (!verifier(formId)) {
        $formData = $("#" + formId).serializeArray();

        $formData.map(function (val) {
          var key = val.name;
          $dataObject[key] = val.value;
        });
        $dataObject["form_id"] = formId;
      } else $dataObject = getAllFormsData($dataObject);

      if (ai != null && pi != null)
        ($dataObject["ai"] = ai), ($dataObject["pi"] = pi);

      //Form Default Valiation
      var formEle = $("#" + formId);
      if (!formEle[0].checkValidity()) {
        var errList = {
          empty: ["Please fill in all the required fields"],
        };
        formErrMsgShowUp(formId, errList);
        formEle[0].reportValidity();
        return false;
      }

      //Form Manual Valiation
      var res = formvalidation(formId, $dataObject);
      if (res.fail == false) return false;
      else $dataObject = res.formData;

      var curObj = $(this);
      if ($(curObj).hasClass("skeleton-loader")) return false;
      curObj.addClass("skeleton-loader");
      // var btnApp = $(this).find(".ffbtntxt");
      // if (!btnLoader(btnApp, curObj)) return false; //Multi Acation prevent

      var goNext = $(this).attr("data-nextGo")
        ? $(this).attr("data-nextGo")
        : ""; //after
      var gotarget = $(this).attr("data-target")
        ? $(this).attr("data-target")
        : "_self"; //after
      var smsg = curObj.attr("data-smsg") ? curObj.attr("data-smsg") : "";

      // if (formId !== "" && typeof formId !== "undefined") {
      //     $formData = $("#" + formId).serializeArray();

      //     $formData.map(function (val) {
      //         var key = val.name;
      //         $dataObject[key] = val.value;
      //     });
      //     $dataObject["form_id"] = formId;
      // } else $dataObject = getAllFormsData($dataObject);

      $dataObject["funnel_id"] = $("meta[name=funnel_id]").attr("content");
      $dataObject["funnel_page_id"] = $("meta[name=funnel_page_id]").attr(
        "content"
      );
      $dataObject["site_id"] = $("meta[name=site_id]").attr("content");

      $dataObject["rule_id"] = "0";
      var device = getUA();
      $dataObject["device"] = device;
      // if ($order["coupon"].status) {
      //     $dataObject["coupon_code"] = $order["coupon"].coupon_code;
      // }
      $dataObject = getUTMtracking(
        params,
        $dataObject,
        $dataObject["funnel_page_id"]
      );

      $dataObject["path"] = pathname;
      var uuid = getCookie("uuid_" + path.host);
      $dataObject["uuid"] = uuid;
      $dataObject["utm_ffid"] = utm_ffid;

      var flexi_tracking = getCookie("flexiTracking_" + FUNNEL_PAGE_ID);
      $dataObject["flexi_tracking"] = flexi_tracking;
      //fbp and fbc
      $dataObject["_fbp"] = getCookie("_fbp") != null ? getCookie("_fbp") : "";
      $dataObject["_fbc"] = getCookie("_fbc") != null ? getCookie("_fbc") : "";

      if (getCookie("split_test").length > 0 && getCookie("split_test") !== null) {
        var controlPage = getCookie("control_page").split("/");
        if (pathname + "/" == getCookie("split_slug")) {
          $dataObject["split_test"] = 1;
          $dataObject["control_page_id"] = controlPage[1];
          $dataObject["control_page_funnel_id"] = controlPage[0];
        }
      }
      //console.log($dataObject);
      //console.log("test");
      // return false;

      // if (t.status) {
      //     $dataObject["utag_main"] = t["utm"];
      //     Object.keys(t["utm"]).forEach(function (key, value) {
      //         $dataObject[key] = t["utm"][key];
      //     });
      // }

      var data = JSON.stringify($dataObject);
      $(".ft-form-error").remove();
      //AutoResponder form code
      if ($("#" + formId).hasClass("ft-autoresponder")) {
        var type = $(this).attr("data-autoresponder");
        if (typeof type !== "undefined") {
          var phone = validatePhone($dataObject["phone"]);
          if (!phone) {
            curObj
              .parent()
              .prepend(
                `<span class="ft-form-error">Please add country code before the phone number</span>`
              );
            curObj.removeClass("gjs-btneffect");
            curObj.find(".fa-spin").remove();
            return false;
          }
        }

        var formAction = $("#" + formId + "_autores form").attr("action");
        var domain = actionUrlCheck(formAction);
        acDomin = domain.split(".");
        var myVar = await $.ajax({
          type: "POST",
          url: BASE_URL + "/subscribe",
          data: data,
          // dataType: "json",
          contentType: "application/json",
          success: function (res) {
            // if (this.response) {
            // var data = JSON.parse(res.body);
            var res = res.body;
            if (res.status == true) {
              var ardata = res.ardata;
              var hidenForm = $("#" + formId + "_autores");
              Object.keys(ardata).forEach(function (key, value) {
                if (key == "SMS__COUNTRY_CODE") {
                  var ft_countrycode = ardata[key];
                  if (ft_countrycode != "") {
                    if (ft_countrycode.indexOf("+") == -1) {
                      ft_countrycode = "+" + ft_countrycode;
                    }
                  }
                  hidenForm.find('[name="' + key + '"]').val(ft_countrycode);
                } else if (key == "SMS") {
                  var phone = ardata[key];
                  var ft_countrycode = ardata["SMS__COUNTRY_CODE"];
                  if (ft_countrycode != "") {
                    if (ft_countrycode.indexOf("+") == -1) {
                      ft_countrycode = "+" + ft_countrycode;
                    }
                  }
                  var ft_phonenumber = phone.replace(ft_countrycode, "");

                  hidenForm.find('[name="' + key + '"]').val(ft_phonenumber);
                } else {
                  hidenForm.find('[name="' + key + '"]').val(ardata[key]);
                }
              });
              //return;
              // var isSubmit = hidenForm.find(
              //     'input[name="submit"],input[type="submit"]'
              // );
              var isSubmit = hidenForm.find(
                'input[name="submit"],input[type="submit"],[id=submit]'
              );

              // isSubmit.each(function (c) {
              //     $(this).remove();
              // });

              if (
                device == "iPad" ||
                device == "iPod" ||
                device == "iPhone" ||
                device == "macOS" ||
                device == "Unknown"
              ) {
                var isForm = hidenForm.find(
                  '[target="_blank"],[target=_blank],[target="_zcSignup"]'
                );
                isForm.each(function (c) {
                  $(this).removeAttr("target");
                });
              }
              formSucssMsgShowUp(formId, curObj, smsg);
              if (!acDomin.includes("icontact")) {
                isSubmit.each(function (c) {
                  $(this).remove();
                });
              }
              // if (isSubmit.length == 1) {
              //     isSubmit.click();
              // } else {
              //     hidenForm.find("form").submit();
              // }
            } else if (res.status == false) {
              formErrMsgShowUp(formId, res.message);
            }
            // }
          },
          error: function (res) {
            console.log(res);
          },
        });
        if (acDomin.includes("icontact")) {
          var hidenForm = $("#" + formId + "_autores");
          var isSubmit = hidenForm.find(
            'input[name="submit"],input[type="submit"],[id=submit]'
          );
          isSubmit.click();
        } else {
          $("#" + formId + "_autores")
            .find("form")
            .trigger("submit");
        }
        return true;
      }
      //FlxiFunnel Form code
      else {

        var errorMode = 0;
        var myVar = await $.ajax({
          type: "POST",
          url: BASE_URL + "/subscribe",
          data: data,
          // dataType: "json",
          contentType: "application/json",
          success: function (res) {
            let resVal = res.body;
            if (resVal.status == true) {
              var smsg = curObj.attr("data-smsg")
                ? curObj.attr("data-smsg")
                : "";
              formSucssMsgShowUp(formId, curObj, smsg);
              errorMode = 1;
            } else {
              // console.log(resVal.message.email);
              formErrMsgShowUp(formId, resVal.message, curObj);
              errorMode = 0;
            }
          },
          error: function (res) {
            formErrMsgShowUp(formId, res.message, curObj);
            errorMode = 0;
          },
        });
        if (goNext !== "") {
          if (typeof FF_CAPI_MODE !== 'undefined') {
            let temp = new URL(goNext);
            let params = new URLSearchParams(temp.search);
            if (!params.has("ff_lead_mode")) {
              params.append("ff_lead_mode", 1);
              if (params.toString()) {
                goNext =
                  goNext.split("?")[0] + "?" + params.toString();
              }
            }
          }
          // let temp = new URL(goNext);
          // let params = new URLSearchParams(temp.search);
          // if (!params.has("ff_lead_mode"))
          //     params.append("ff_lead_mode", 1);
          // if (params.toString()) goNext += "?" + params.toString();
          if (gotarget == "_self") {
            if (errorMode == 1) {
              window.open(goNext, gotarget);
            }
          } else {
            if (
              device == "iPad" ||
              device == "iPod" ||
              device == "iPhone" ||
              device == "macOS" ||
              device == "Unknown"
            ) {
              //  window.open(goNext);
              if (errorMode == 1) {
                window.location.href = goNext;
              }
            } else {
              if (errorMode == 1) {
                window.open(goNext, "_blank");
              }
            }

            // alert(1);
            // var windowReference = window.open();
            // myService.getUrl().then(function (goNext) {
            //     windowReference.location = goNext;
            // });
          }
        }
      } //else end
      return false;
    }),
    // ***********************************
    // **************Visiter begin******
    // ***********************************
    (getVisitorData = function () {
      var funnel = $("a[href*='#funnel']");
      var product = $("a[href*='#product']");
      var form = $(".flexi-form").not(".flexi-orderform");
      var orderform = $(".flexi-orderform");
      var viList = [];

      //product data
      if (
        typeof $order !== "undefined" &&
        typeof $order["product"].p_id != "undefined"
      ) {
        var item = {};
        item["type"] = "product";
        item["fromcheckout"] = "checkout";
        item["product_id"] = $order["product"].p_id;
        item["currency"] = $order["product"].currency;
        viList.push(item);
      }

      //product list
      product.each(function (index, obj) {
        var item = {};
        var p_id = $(obj).attr("data-ft-productdata");
        if (!verifier(p_id)) {
          item["product_id"] = p_id;
          item["type"] = "product";
          viList.push(item);
        }
      });
      //Funnel list
      funnel.each(function (index, obj) {
        var item = {};
        var p_id = $(obj).attr("data-ft-productdata");
        if (!verifier(p_id)) {
          item["product_id"] = p_id;
          item["type"] = "funnel";

          var f_id = $(obj).attr("data-ft-funnelData");
          item["funnel_id"] = f_id;
          item["funnel_product_id"] = $(obj).attr("data-funnel_product_id");
          viList.push(item);
        }
      });
      //From List
      form.each(function (index, obj) {
        var item = {};
        item["form_id"] = $(obj).attr("id");
        item["type"] = "form";
        viList.push(item);
      });

      //Orderform
      orderform.each(function (index, obj) {
        var item = {};
        item["form_id"] = $(obj).attr("id");
        item["type"] = "orderform";
        viList.push(item);
      });
      return viList;
    });
  // ***********************************
  // **************Visiter end******
  // ***********************************

  // ************************************
  // ************** Affiliate begin******
  // ************************************

  affiliateRequest = function (anyCheckoutExist) {
    // var anyCheckoutExist = $(".flexi-orderform").length > 0 ? true : false;
    var anyProdExist =
      $("a[href*='#product'],a[href*='#funnel']").length > 0 ? true : false;
    var p_visitor = getVisitorData();
    var valCheckout = "fromcheckout";
    var anyCheckoutExist =
      p_visitor.filter(function (o) {
        return o.hasOwnProperty(valCheckout);
      }).length > 0;

    var hostCookie = getCookie(path.host);
    var prodFound = p_visitor.filter((pro) => pro.product_id === pi);

    //NONE CHECKOUT PAGE
    if (
      (ai !== null || hostCookie != "") &&
      anyProdExist === true &&
      anyCheckoutExist !== true
    ) {
      var todaysDate = new Date().toISOString().split("T")[0];
      const chainedPro = prodFound
        .slice(0, prodFound.length)
        .map((item) => item.product_id);

      var filteredChainedPro = chainedPro.filter(function (item, pos) {
        return chainedPro.indexOf(item) == pos;
      });

      var temp = [];
      temp.push({
        key: "chained_pro",
        value: filteredChainedPro,
      });
      if (ai !== null) {
        temp.push({
          key: path.host,
          value: ai,
        });
      }
      setCookie(temp);

      var af_id = ai !== null ? ai : getCookie(path.host);
      var p_id = pi != null ? pi : p_visitor[0].product_id;

      var utmId = p_id;
      var uniqFunnelVs = 0;

      if (typeof p_visitor[0].funnel_id != "undefined") {
        var pFunnelId = p_visitor[0].funnel_id;
        var uniqueFunnelVs = getCookie("funnel_pro" + pFunnelId);
        if (uniqueFunnelVs == todaysDate) uniqFunnelVs = 1;
        setCookie([
          {
            key: "funnel_pro" + pFunnelId,
            value: todaysDate,
          },
        ]);
      }
      if (ti != "") {
        setCookie([
          {
            key: "ti" + p_id,
            value: ti,
          },
        ]);
      }

      var cVari = "p" + p_id;
      var loadCountVar = "load_flx_affi_" + af_id + "_" + p_id;
      var loadPageTimes = getCookie(loadCountVar);
      if (loadPageTimes !== null) {
        // loadCount = parseInt(loadPageTimes) + 1;
        // console.log(loadCount);
        loadPageTimes++;
        setCookie([
          {
            key: loadCountVar,
            value: loadPageTimes,
          },
        ]);
        var loadCount = loadPageTimes;
      }

      var uniqueVs = getCookie("un_vs_" + af_id + "_" + p_id);
      var uniqueVendor = getCookie("un_vd_" + p_id);

      var uniqVs = 0;
      if (uniqueVendor == "" && uniqFunnelVs == 0) {
        uniqVs = 1;
        setCookie([
          {
            key: "un_vs_" + af_id + "_" + p_id,
            value: generateUniqueId(),
          },
          {
            key: "un_vd_" + p_id,
            value: generateUniqueId(),
          },
        ]);
      }

      var firstpurchase = "firstpurchase_" + af_id + "_" + p_id;
      if (getCookie(firstpurchase) != "")
        var insertedDynaVal = getCookie(firstpurchase);
      else var insertedDynaVal = getCookie("ai_" + af_id + "_" + p_id);

      setCookie([
        {
          key: cVari,
          value: af_id,
        },
      ]);

      var affiliateData = {
        affiliate_id: af_id,
        product_id: p_id,
        tracking_code: ti,
        fid: FUNNEL_ID,
        ffid: FUNNEL_PAGE_ID,
        load_count: loadCount,
        vistors_count: uniqVs,
        db_affiliate: insertedDynaVal,
        query_string: path.pathname,
        path: path.pathname,
        p_visitor: p_visitor,
        type: "sales",
      };

      var lus = getCookie("lus_" + FUNNEL_PAGE_ID);

      if (lus != "" && lus != params.get("utm_source")) {
        affiliateData.load_count = 1;
        affiliateData.db_affiliate = "";
      }

      setUTMtracking(params, FUNNEL_PAGE_ID);
      // affiliateData = getUTMtracking(
      //     params,
      //     affiliateData,
      //     FUNNEL_PAGE_ID
      // );

      if (anyProdExist) affiliateData.affiliate = true;
      var uuid = getCookie("uuid_" + path.host);
      affiliateData["uuid"] = uuid;
      affiliateData["_fbp"] = getCookie("_fbp") != null ? getCookie("_fbp") : "";
      affiliateData["_fbc"] = getCookie("_fbc") != null ? getCookie("_fbc") : "";
      var data = JSON.stringify(affiliateData);

      callHTTP(BASE_URL + "/stats", data, function (res) {
        if (res.readyState === 4) {
          var affiStatsRes = JSON.parse(res.responseText);

          var affiInsertId =
            affiStatsRes.SendMessageResponse.SendMessageResult
              .MessageId;

          if (insertedDynaVal == "") {
            setCookie([
              {
                key: "affi_val",
                value: affiInsertId,
              },
              {
                key: "ai_" + af_id + "_" + p_id,
                value: affiInsertId,
              },
            ]);
          }
        }
      });
    }
    //NORMAL PAGE VISITOR START & NOT FORM PAGE
    else {
      let filter = p_visitor.filter(
        (d) => d.type == "product" || d.type == "funnel"
      );

      var pageLoad = "page_" + FUNNEL_PAGE_ID;
      //IF PRODUCT
      if (anyProdExist && p_visitor.length > 0) {
        var fProdId = p_visitor[0].product_id;
        var utmId = p_visitor[0].product_id;

        var insSingleProduct = getCookie("s_ai" + fProdId);
        var insSinglePro = getCookie(pageLoad);

        var uniqueVs = getCookie("s_un_vs" + fProdId);
        if (uniqueVs == "") {
          setCookie([
            {
              key: "s_un_vs" + fProdId,
              value: 1,
            },
          ]);
        }

        var load_flx = "load_flx_product" + "_" + FUNNEL_PAGE_ID;
        var loadPageTimes = getCookie(load_flx);
        if (loadPageTimes !== null) {
          // loadCountS = parseInt(loadPageTimes) + 1;
          // setCookie([
          //     {
          //         key: load_flx,
          //         value: loadCountS
          //     }
          // ]);

          loadPageTimes++;
          setCookie([
            {
              key: load_flx,
              value: loadPageTimes,
            },
          ]);
          var loadCountS = loadPageTimes;
        } else loadCountS = 1;

        var currency = p_visitor[0].currency;
        if (
          getCookie("affi_val") != "" &&
          getCookie("s_ai" + filter[0].product_id) != ""
        )
          var pageType = "checkout";
        else var pageType = "sales";
      }
      //NOT PRODUCT
      else {
        var utmId = FUNNEL_PAGE_ID;
        var pageType = "normal";
        var insSinglePro = getCookie(pageLoad);
        var uniqueVs = getCookie("f_un_vs" + FUNNEL_PAGE_ID);
        if (uniqueVs == "") {
          setCookie([
            {
              key: "f_un_vs" + FUNNEL_PAGE_ID,
              value: 1,
            },
          ]);
        }

        var load_flx = "load_flx_page" + "_" + FUNNEL_PAGE_ID;

        var loadPageTimes = getCookie(load_flx);
        if (!verifier(loadPageTimes)) {
          // loadCountS = parseInt(loadPageTimes) + 1;
          // setCookie([
          //     {
          //         key: load_flx,
          //         value: loadCountS
          //     }
          // ]);
          loadPageTimes++;
          setCookie([
            {
              key: load_flx,
              value: loadPageTimes,
            },
          ]);
          var loadCountS = loadPageTimes;
        } else loadCountS = 1;
      }

      var pageData = {
        fid: FUNNEL_ID,
        ffid: FUNNEL_PAGE_ID,
        load_count: loadCountS,
        vistors_count: uniqueVs ? 0 : 1, //Unique visitor
        query_string: path.pathname,
        path: path.pathname,
        db_affiliate: insSinglePro,
        p_visitor: p_visitor,
        type: pageType,
        currency: currency,
      };

      setUTMtracking(params, utmId);
      // pageData = getUTMtracking(params, pageData, utmId);

      pageData.product_id = fProdId ? fProdId : "";
      var lp_value = getCookie("lastpaid");

      if (lp_value != "" && p_visitor.length > 0) {
        var lastpaid = lp_value.split("_");
        pageData.product_id = lastpaid[1];
        pageData.affiliate_id = lastpaid[0];

        pageData.tracking_code = getCookie("ti" + lastpaid[1]);
        pageData.affiliate = true;
        pageData.load_count = 0;
        pageData.db_affiliate = "";
      }

      var firstPurchase_noaffi = getCookie(
        "firstpurchase_noaffi_" + pageData.product_id
      );

      //IF ORDER FORM
      if (anyCheckoutExist) {
        pageData.product_id = filter[0].product_id;

        var firstPurchase = getCookie(
          "firstpurchase_" + pageData.affiliate_id + "_" + pageData.product_id
        );

        var lastPaidSet = getCookie("last_paid_set");
        var affi_val = getCookie("affi_val");

        if (affi_val != "" && firstPurchase == "") pageData.type = "checkout";
        else if (firstPurchase != "") {
          pageData.type = "sales";
          pageData.db_affiliate = lastPaidSet == "" ? "" : affi_val;
        } else if (firstPurchase_noaffi != "") {
          pageData.type = "sales";

          pageData.db_affiliate =
            lastPaidSet == "" ? "" : getCookie("noaffi_" + pageData.product_id);
          pageData.load_count = 0;
        } else if (getCookie("s_ai" + filter[0].product_id) != "") {
          pageData.type = "checkout";
        } else if (
          getCookie("s_ai" + filter[0].product_id) == "" &&
          filter[0].product_id != ""
        ) {
          pageData.type = "checkout";
        } else pageData.type = "sales";
      }
      var uuid = getCookie("uuid_" + path.host);
      pageData["uuid"] = uuid;
      pageData["_fbp"] = getCookie("_fbp") != null ? getCookie("_fbp") : "";
      pageData["_fbc"] = getCookie("_fbc") != null ? getCookie("_fbc") : "";
      var data = JSON.stringify(pageData);
      callHTTP(BASE_URL + "/stats", data, function (res) {
        if (res.readyState === 4) {
          var pageStatsRes = JSON.parse(res.responseText);

          var pInsertId =
            pageStatsRes.SendMessageResponse.SendMessageResult
              .MessageId;

          var lastPaidSet = getCookie("last_paid_set");

          //Affiliates Back button functionlity start here
          if (
            lp_value != "" &&
            anyCheckoutExist === true &&
            lastPaidSet == ""
          ) {
            setCookie([
              {
                key: "last_paid_set",
                value: pInsertId,
              },
              {
                key: "affi_val",
                value: pInsertId,
              },
              {
                key:
                  "ai_" +
                  pageData.affiliate_id +
                  "_" +
                  pageData.product_id,
                value: pInsertId,
              },
            ]);
          }
          //Non Affiliates Back button
          if (
            firstPurchase_noaffi != "" &&
            anyCheckoutExist === true &&
            lastPaidSet == ""
          ) {
            var temp = [
              {
                key: "last_paid_set",
                value: pInsertId,
              },
              {
                key: "s_ai" + fProdId,
                value: pInsertId,
              },
              {
                key: "noaffi_" + fProdId,
                value: pInsertId,
              },
            ];
            setCookie(temp);
          }
          //Non Affiliates Back button

          if (!verifier(insSingleProduct) && p_visitor.length > 0) {
            setCookie([
              {
                key: "s_ai" + fProdId,
                value: pInsertId,
              },
              {
                key: pageLoad,
                value: pInsertId,
              },
              {
                key: "noaffi_" + fProdId,
                value: pInsertId,
              },
            ]);
          } else {
            setCookie([
              {
                key: pageLoad,
                value: pInsertId,
              },
            ]);
          }
        }
      });
    } //NORMAL PAGE VISITOR END
  };
  if ($(".flexi-orderform").length == 0) affiliateRequest();

  // **********************************************
  // ************** Affiliate close*****************
  // **********************************************

  // **********************************************
  // **************Timer Initialize begin**********
  // **********************************************

  pad = function (num, size) {
    if (num > 0) {
      var s = num + "";
      if (s.length < size) s = "0" + s;
      return s;
    } else return "00";
  };
  ftTimerInitalize = function (distance, timerObj) {
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //  var timer = $('body').find('.countdown');
    timerObj.find(".tdays").html(pad(days, 2));
    timerObj.find(".thours").html(pad(hours, 2));
    timerObj.find(".tminutes").html(pad(minutes, 2));
    timerObj.find(".tseconds").html(pad(seconds, 2));
  };
  ftEveryGreen = function (timerObj) {
    var days = parseInt(timerObj.attr("countdown-days"));
    var hours = parseInt(timerObj.attr("countdown-hours"));
    var minutes = parseInt(timerObj.attr("countdown-minutes"));
    var seconds = parseInt(timerObj.attr("countdown-seconds"));

    var e_type = timerObj.attr("expire-type")
      ? timerObj.attr("expire-type")
      : "";
    var e_days = 0;

    if (e_type == "expirecookie") {
      e_days = timerObj.attr("expire-days")
        ? parseInt(timerObj.attr("expire-days"))
        : 30;
      var e_key = "timerExpire_" + FUNNEL_PAGE_ID + "_" + id;
      var etemp = new Date();
      etemp.setHours(etemp.getHours() + e_days * 24);
      setCookie([
        {
          key: e_key,
          value: etemp,
        },
      ]);
    }

    var deadline = new Date();

    deadline.setHours(deadline.getHours() + days * 24);
    deadline.setHours(deadline.getHours() + hours);
    deadline.setMinutes(deadline.getMinutes() + minutes);
    deadline.setSeconds(deadline.getSeconds() + seconds);

    var id = timerObj.attr("id");
    document.cookie =
      "ftGreenEnd_" +
      FUNNEL_PAGE_ID +
      "_" +
      id +
      "=" +
      deadline +
      "; expires=Fri, 31 Dec 9999 23:59:59 GMT";

    var initTime = days * 24 + hours * 60 + minutes * 1000 + seconds + e_days;
    document.cookie =
      "ftinitTime_" +
      FUNNEL_PAGE_ID +
      "_" +
      id +
      "=" +
      initTime +
      "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    return deadline;
  };
  ftTimerEnded = function (timerObj) {
    var eaction = timerObj.attr("countdown-eaction");
    //console.log(eaction);
    if (eaction == 2) {
      timerObj.fadeOut();
      // timerObj.addClass("animate__animated animate__bounceOut");
      // x.getElementsByClassName("countdown-inner")[0].style.display ="none";
    } else if (eaction == 3) {
      var rUrl = timerObj.attr("countdown-rurl");
      window.open(rUrl, "_self");
    } else if (eaction == 5) {
      timerObj.find(".countdown-inner").hide(0, function () {
        timerObj
          .find(".timer-after-txt")
          .addClass("animate__animated animate__bounceIn")
          .show();
      });
    } else if (eaction == 6) {
      var hele = timerObj.attr("hide-element");
      $(hele).hide();
      var sele = timerObj.attr("show-element");
      $(sele).show();
    }
  };
  function Interval(time) {
    this.curObj = null;
    this.timer = false;
    this.interval = null;
    var timer = false;
    this.start = function (obj) {
      this.curObj = obj;

      if (!this.isRunning()) {
        var timerObj = $(this.curObj);
        var date = new Date();
        var endtime = timerObj.attr("countdown-endtime")
          ? timerObj.attr("countdown-endtime")
          : 0;

        var hh = timerObj.attr("countdown-end_hh");
        var mm = timerObj.attr("countdown-end_mm");
        var t2 = endtime + " " + hh + ":" + mm;
        var offset = timerObj.attr("countdown-offset")
          ? timerObj.attr("countdown-offset")
          : date.getTimezoneOffset();
        var type = timerObj.attr("countdown-type");

        var now = getTimerDate(null, offset);
        var curDate = now.getTime();

        var nd2 = t2;
        var nd2 = getTimerDate(t2, offset);
        //var endDate = new Date(nd2).getTime();
        var endDate = nd2;
        var distance = nd2 - now;

        if (type == "basic") {
          if (distance <= 0) ftTimerEnded(timerObj);
          else ftTimerInitalize(distance, timerObj);

          var cur = this;
          this.timer = setInterval(function () {
            var now = getTimerDate(null, offset);
            var distance = endDate - now;

            if (distance <= 0) {
              cur.stop();
              ftTimerEnded(timerObj);
              return;
            }
            ftTimerInitalize(distance, timerObj);
          }, time);
        } else if (type == "evergreen") {
          var days = parseInt(timerObj.attr("countdown-days"));
          var hours = parseInt(timerObj.attr("countdown-hours"));
          var minutes = parseInt(timerObj.attr("countdown-minutes"));
          var seconds = parseInt(timerObj.attr("countdown-seconds"));
          var e_days = parseInt(timerObj.attr("expire-days"));

          var e_type = timerObj.attr("expire-type")
            ? timerObj.attr("expire-type")
            : "";
          var e_days =
            timerObj.attr("expire-type") == "expirecookie"
              ? parseInt(timerObj.attr("expire-days"))
              : 0;

          // console.log(e_type);
          var initTime =
            days * 24 + hours * 60 + minutes * 1000 + seconds + e_days;

          var id = timerObj.attr("id");
          var coisValue = getCookie("ftGreenEnd_" + FUNNEL_PAGE_ID + "_" + id);

          var e_key = "timerExpire_" + FUNNEL_PAGE_ID + "_" + id;
          if (coisValue == "") {
            deadline = ftEveryGreen(timerObj);
          } else {
            var cotInit = getCookie("ftinitTime_" + FUNNEL_PAGE_ID + "_" + id);

            if (cotInit != initTime) {
              deadline = ftEveryGreen(timerObj);
            } else {
              var deadline = coisValue;
            }
          }
          var endDate = Date.parse(new Date());
          var distance = Date.parse(deadline) - endDate;
          if (distance <= 0) {
            if (e_type == "expirecookie") {
              var t = getCookie("timerExpire_" + FUNNEL_PAGE_ID + "_" + id);
              var res = Date.parse(t) - Date.parse(deadline);
              if (res <= 0) deadline = 0;
              else deadline = ftEveryGreen(timerObj);
            } else deadline = ftEveryGreen(timerObj);
          }

          var cur = this;

          this.timer = setInterval(function () {
            var endDate = Date.parse(new Date());
            var distance = Date.parse(deadline) - endDate;
            if (distance <= 0) {
              cur.stop();
              ftTimerEnded(timerObj);
            }
            ftTimerInitalize(distance, timerObj);
          }, 1000);
        } //Green Timer End
        else if (type == "daily") {
          var month = now.getUTCMonth() + 1; //months from 1-12
          var day = now.getUTCDate();
          var year = now.getUTCFullYear();

          endtime = year + "/" + month + "/" + day;
          //t2 = "2022/05/17 23:59:00";
          var t2 = endtime + " " + hh + ":" + mm;

          // var nd2 = getTimerDate(t2, offset);
          var endDate = new Date(t2).getTime();
          var distance = endDate - now;

          var cur = this;

          if (distance <= 0) ftTimerEnded(timerObj);
          else ftTimerInitalize(distance, timerObj);

          this.timer = setInterval(function () {
            var now = getTimerDate(null, offset);
            var distance = endDate - now;

            if (distance <= 0) {
              cur.stop();
              ftTimerEnded(timerObj);
            }
            ftTimerInitalize(distance, timerObj);
          }, time);
        } // Daily Timer End
      }
    };

    this.stop = function () {
      clearInterval(this.timer);
      timer = false;
    };
    this.isRunning = function () {
      return timer !== false;
    };
  }

  var timer = $("body").find(".countdown");
  timer.each(function (index, item) {
    var i = new Interval(1000);
    i.start(item);
  });
  // **********************************************
  // **************Timer Initialize begin**********
  // **********************************************

  // **********************************************
  // **************Video Floating begin**********
  // **********************************************

  //Sticky action
  $sticky = $(".ft-stickytop:visible");
  setWrapperSticky = function (sObj) {
    sObj.each(function (index, item) {
      var tempc = ["ftdesktop-visible", "ftmobile-visible"];
      var cObj = $(this);
      var fres = tempc.filter(function (itm) {
        return cObj.hasClass(itm);
      });
      $(this).wrap(
        `<div class="sticky-parent ${fres.length ? fres[0] : ""
        }"><div class="ft-sticky-inner"></div></div>`
      );
    });
  };
  setWrapperSticky($sticky);

  stickySet = function (scroll) {
    $sticky.each(function (index, item) {
      if ($(this).css("display") == "block") {
        var pobj = $(this).parent();
        $stickyOffset = pobj.parent().offset().top;
        if (scroll >= $stickyOffset) {
          pobj.parent().height($(this).outerHeight(true));
          pobj.addClass("ft-stickytop-box");
        } else pobj.removeClass("ft-stickytop-box");
      }
    });
  };


  $fFirst = $(".ft-floating:visible").first();
  $fFirst.wrap(`<div class='ft-floatsec' vifloat="0"></div>`);
  $fFirst_p = $fFirst.parent();
  if ($fFirst.attr("ftclose") == "fcloseon")
    $fFirst_p.append(
      '<div class="ftclose"><img src="https://assets.flexifunnels.com/images/exit.png"/></div>'
    );
  floatingSet = function (fFirst) {
    var floaton = fFirst.attr("floaton");
    if (floaton == "floaton") {
      var s_top = $(window).scrollTop();
      var offset = fFirst.offset();
      var top = fFirst.attr("data-offset");
      if (typeof top == "undefined" || top.trim == "") {
        fFirst.attr("data-offset", offset.top);
        var paheight = $fFirst_p.parent().height();
        $fFirst_p.parent().height(paheight);
      }
      var top =
        parseInt(fFirst.attr("data-offset")) + fFirst.height() / 2;
      if (s_top > top) {
        var ftposition = fFirst.attr("ftposition");
        $fFirst_p.addClass(ftposition);
        $fFirst_p.attr("vifloat", 1);
      } else $fFirst.parent().attr("vifloat", 0);
    }
  };
  if ($fFirst.length !== 0) floatingSet($fFirst);
  $(document).on("click", ".ftclose>img", function () {
    $fFirst.attr("floaton", "off");
    $fFirst_p.attr("vifloat", 0);
  });

  $(window).on(
    "load orientationchange resize scroll touchmove focus",
    function (event) {
      var s_top = $(window).scrollTop();
      if ($sticky.length !== 0) stickySet(s_top); //Sticky Calling
      if ($fFirst.length !== 0) floatingSet($fFirst); //floating Calling
      //  if ($sticky.length !== 0) setWrapperSticky($sticky); //Sticky Calling
    }
  );


  // **********************************************
  // **************Video Floating begin**********
  // **********************************************

  // **********************************************
  // *************Custom Code begin*************
  // **********************************************
  var custom = $("body").find(".ft-custom-block");
  custom.each(function (index, item) {
    var code = $(this).attr("ft-customcode");
    if (code !== "" && typeof code != "undefined") {
      $(this).children().remove();
      // console.log(code);
      $(this).append(code);
      $(this).removeAttr("ft-customcode");
    }
  });
  // **********************************************
  // *************Custom Code close*************
  // **********************************************

  // **********************************************
  // ************bg Video*************
  // **********************************************
  onPlayerReady = function (event) {
    event.target.playVideo();
  };
  onYouTubeLazy = function (videoId, ref) {
    player = new YT.Player(ref, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  loadPlayer = function (videoId, ref, type) {
    if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubePlayerAPIReady = function () {
        if (type == 1) onYouTubeLazy(videoId, ref);
        else onYouTubePlayer(videoId);
      };
    } else {
      if (type == 1) onYouTubeLazy(videoId, ref);
      else onYouTubePlayer(videoId);
    }
  };
  var player;
  function onYouTubePlayer(videoId) {
    player = new YT.Player("video-placeholder", {
      videoId: videoId,
      playerVars: {
        mute: 1,
        loop: 1,
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        showsearch: 0,
        iv_load_policy: 3,
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      player.seekTo(0);
      player.playVideo();
    }
  }
  var bgvideo = $(".ftvideo-block");
  if (bgvideo.length != 0) {
    if (screen.width > 768) {
      $(".ftvideo-img").hide();
      var mode = bgvideo.attr("data-mode");
      if (mode == "on") loadPlayer(bgvideo.attr("data-videoid"));
    } else $(".ftvideo-img").removeClass("ff-none");
  }
  // **********************************************
  // ************bg Video*************
  // **********************************************

  // **********************************************
  // ************Country code Phone field *********
  // **********************************************
  var phpone = $('input[name="phone"]');
  var country = [];
  ftphoneVerify = function (obj) {
    var temp = {
      isValid: true,
      no: obj.val().replace(" ", ""),
      dc: "",
      err: "",
    };

    var errorMap = [
      "Invalid phone number",
      "Invalid country code",
      "Phone number too short",
      "Phone number too long",
      "Invalid phone number",
    ];

    var tel = obj.attr("data-tel");
    var isValid = country[tel].isValidNumber();
    var getNo = country[tel].getNumber();

    var getdc = country[tel].getSelectedCountryData().dialCode;
    temp.dc = !verifier(getdc) ? getdc : false;

    if (isValid === true) {
      var getNo = country[tel].getNumber();
      temp.no = !verifier(getNo) ? getNo : obj.val();
    } else {
      var errorCode = country[tel].getValidationError();
      var errMsg = errorMap[errorCode];
      if (!verifier(errMsg) && isValid === false) {
        temp.err = errMsg;
        temp.isValid = false;
      } else {
        if (ftphonenumber(obj.val())) {
          temp.err = "Please enter a valid phone number";
          temp.isValid = false;
        } else {
          var pNo = temp.no.replace("+", "");
          if (temp.dc && pNo.slice(0, temp.dc.length) !== temp.dc) {
            temp.no = "+" + temp.dc + pNo;
          }
        }
      }
    }
    return temp;
  };

  if (phpone.length !== 0) {
    phpone.each(function (index, item) {
      try {
        var cur = $(this).attr("name") + "_" + index;
        $(this).attr("data-tel", cur); // console.log(cur);
        country[cur] = window.intlTelInput($(this)[0], {
          utilsScript: "https://assets.flexifunnels.com/js/utils.js",
        });
        window.iti = country[cur];
        let code = $(this).attr("country-code")
          ? $(this).attr("country-code")
          : "in";
        country[cur].setCountry(code);
      } catch (err) {
        console.log(err);
      }
    });
  }

  var c_list = $('select[name="country"]');
  if (c_list.length != 0) {
    callHTTP(
      "https://plugin.flexifunnels.com/general/countries.json",
      "",
      function (res) {
        if (res.readyState === 4) {
          c_list.each(function (index, item) {
            let list = `<option value="">Select a country</option>`;
            JSON.parse(res.responseText).forEach(function (item, index) {
              list += `<option value="${item.code}">${item.name}</option>`;
            });
            $(this).append(list);
          });
        }
      },
      "get"
    );
  }

  // **********************************************
  // ************Country code Phone field *********
  // **********************************************

  // *****************************************
  // ************Accordion start *********
  // *****************************************
  $(".togglefaq").click(function (e) {
    e.preventDefault();
    var pAcc = $(this).closest(".ff-accordion");
    var notthis = pAcc.find(".active").not(this);
    var icons = pAcc.attr("icon-type")
      ? pAcc.attr("icon-type")
      : "fa-plus fa-minus";
    var sicons = icons.split(" ");
    notthis.find(".faq-icon").addClass(sicons[0]).removeClass(sicons[1]);
    notthis.toggleClass("active").next(".faqanswer").hide();
    $(this).toggleClass("active").next().slideToggle("fast");
    $(this).children("i").toggleClass(icons);
  });
  function delayInterval(obj) {
    var time = $(obj).attr("ft-delay");
    this.dtimer = parseInt(time) * 1000;
    this.start = function (obj) {
      setTimeout(function () {
        obj.hide().removeAttr("ft-delay").fadeIn();
      }, this.dtimer);
    };
  }

  $("[ft-delay]").each(function (index, item) {
    var i = new delayInterval(this);
    i.start($(this));
  });
  $(".ffshort-time").each(function (index, item) {
    var cObj = $(this);
    var ed = new Date();
    var cday = cObj.attr("custom-day");
    var csel = cObj.attr("custom-sel");
    cday ? ed.setHours(ed.getHours() + parseInt(cday) * 24) : "";
    var day = ed.getUTCDate();
    var year = ed.getUTCFullYear();
    var month = ed.toLocaleString("default", { month: "long" }).slice(0, 3);
    var ds = ed.toLocaleString("en-us", { weekday: "long" });

    var txt = csel == "edd" ? `${ds}, ` : "";
    txt += `${month} ${pad(day, 2)}, ${year}`;

    //if ($(this).children().length) cObj = $(this).children().last();
    // $(this).attr("action", "1").empty().append(txt);
    var html = $(this).text();
    // console.log(html);

    html = html
        .replace(/{Day, DD MM YYYY}/g, txt)
        .replace(/{MM,DD YYYY}/g, txt);
    //  .replace(/ffshort-time/g, "");
    // $(this).attr("action", "1").empty().append(html);
    $(this).attr("action", "1").text(html);
});
  // ******************************************
  // ************Accordion end *********
  // ******************************************
  analsysts(0, 0);

  var list_of_product = $("a[href*='#product']");
  var oldBumpProduct = [];
  list_of_product.each(function (c) {
    $product_id = $(this).attr("data-ft-productData");

    if ($product_id != "" && typeof $product_id != "undefined") {
      var b_product_id = $product_id ? $product_id : 0;
      var product_data = {
        product_id: $product_id ? $product_id : "",
        type: "product",
      };
      if (oldBumpProduct.includes(b_product_id) === false) {

        var data = JSON.stringify(product_data);
        callHTTP(BASE_URL + "/order-details", data, function (res) {
          if (res.readyState === 4) {
            var res = JSON.parse(res.responseText);
            console.log(res.body.bump);
            if (res.body.bump.length > 0) {

              console.log(res.body);

              res.body.bump.map(function (bump) {
                bump.p_id = res.body.product.p_id;
                analsysts(0, bump);
              });
            }
          }
        });
      }
      oldBumpProduct.push(b_product_id);
    }
  });
});


function analsysts(productId, bump) {
  "use strict";
  var a = window.location,
    r = window.document,
    o = r.currentScript,
    eventTrigger = 1,
    l = "https://analytics.flexifunnels.link/api/event";

  function s(t, e) {
    t && console.warn("Ignoring Event: " + t),
      e && e.callback && e.callback();
  }

  function t(t, e) {
    if (
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(
        a.hostname
      ) ||
      "file:" === a.protocol
    )
      return s("localhost", e);
    if (
      window._phantom ||
      window.__nightmare ||
      window.navigator.webdriver ||
      window.Cypress
    )
      return s(null, e);
    try {
      if ("true" === window.localStorage.plausible_ignore)
        return s("localStorage flag", e);
    } catch (t) { }

    var funnel = $("a[href*='#funnel']");
    var product = $("a[href*='#product']");
    var form = $(".flexi-form");
    var orderform = $(".flexi-orderform");

    // if (funnel != "undefined" && funnel.length > 0) {
    //     pageTypeP = "SALES";
    // }
    // if (product != "undefined" && product.length > 0) {
    //     pageTypeP = "SALES";
    // }

    //    if(form && form !='undefined'){
    //         pageTypeP = 'LEADS';
    //     }
    if (orderform != "undefined" && orderform.length > 0) {
      pageTypeP = "CHECKOUT";
      if (productId == 0) {
        eventTrigger = 0;
      }
      if (bump != 0) {
        pageTypeP = "BUMP_CHECKOUT";
        eventTrigger = 1;
      }
    } else {
      if (form != "undefined" && form.length > 0) {
        pageTypeP = "LEADS";
      }
    }

    if (funnel != "undefined" && funnel.length > 0) {
      pageTypeP = "SALES";
    }
    if (product != "undefined" && product.length > 0) {
      pageTypeP = "SALES";
    }
    if (bump != 0) {
      pageTypeP = pageTypeP == "BUMP_CHECKOUT" ? "BUMP_CHECKOUT" : "BUMP_VIEWS";
    }
    // var ptck = getCookie("flexiTracking");
    var ptck = getCookie("flexiTracking_" + FUNNEL_PAGE_ID);

    var ptckObj = ptck ? JSON.parse(ptck) : "";
    var tckdata = {};
    console.log(ptckObj);
    if (ptckObj != "") {
      // ptckObj.params.split("&").forEach(function (item) {
      //     var parts = item.split("=");
      //     if (parts.length < 2) parts.push("");
      //     tckdata[decodeURIComponent(parts[0])] = decodeURIComponent(
      //         parts[1]
      //     );
      // });
    }
    console.log(tckdata);

    const requestData = {
      page_funnel_id: FUNNEL_ID,
      page_id: FUNNEL_PAGE_ID,
      pageType: pageTypeP,
      utm_ffid: utm_ffid,
      // Add more data as needed
    };
    if (bump != 0) {
      console.log(bump);
      //pageTypeP = "BUMP_VIEWS";
      requestData.bump_id = bump.b_product_id;
      requestData.bump_price = bump.bump_price;
      requestData.product_id = bump.p_id;
    }
    var uuid = "uuid_" + path.host;
    if (getCookie("uuid_" + path.host) == "") {
      setCookie([
        {
          key: uuid,
          value: generateUUID(),
        },
      ]);
    }
    if (productId != 0) {

      requestData.product_id = productId;
      if (fid !== null) {
        requestData.funnel_id = ffid;
      }
      if (ffid !== null) {
        requestData.funnel_product_id = fid;
      }
    }
    console.log(getCookie("split_test"));
    if (getCookie("split_test").length > 0 && getCookie("split_test") !== null) {
      var controlPage = getCookie("control_page").split("/");
      if (pathname + "/" == getCookie("split_slug")) {
        requestData.control_page_id = controlPage[1];
        requestData.control_page_funnel_id = controlPage[0];
        requestData.split_test = 1;
      }
    }
    requestData.uuid = getCookie("uuid_" + path.host);
    const rData = { ...requestData, ...tckdata };
    console.log(rData);
    // else {
    console.log("normal Plasuble");
    if (eventTrigger == 1) {
      var n = {},
        i =
          ((n.n = pageTypeP),
            (n.u = a.href),
            (n.d = path.host),
            (n.r = r.referrer || null),
            e && e.meta && (n.m = JSON.stringify(e.meta)),
            (n.p = JSON.stringify(rData)),
            new XMLHttpRequest());
      i.open("POST", l, !0),
        i.setRequestHeader("Content-Type", "text/plain"),
        i.send(JSON.stringify(n)),
        (i.onreadystatechange = function () {
          4 === i.readyState && e && e.callback && e.callback();
        });
    }
    console.log("normal end Plasuble");

    var p_visitor = getVisitorData();
    console.log(p_visitor);
    var anyProdExist =
      $("a[href*='#product'],a[href*='#funnel']").length > 0 ? true : false;
    if (anyProdExist && bump == 0) {
      console.log("product Plasuble or funnel");
      var oldProduct = [];
      p_visitor.map(function (val) {
        console.log(oldProduct.includes(val.product_id));

        if (oldProduct.includes(val.product_id) === false) {
          console.log(val);
          if (val.type == "product") {
            requestData.pageType = "PRODUCT_VIEWS";
            requestData.product_id = val.product_id;
          } else {
            requestData.pageType = "PRODUCT_VIEWS";
            requestData.product_id = val.product_id;
            requestData.funnel_id = val.funnel_id;
            requestData.funnel_product_id = val.funnel_product_id;
          }
          const rData = { ...requestData, ...tckdata };

          var n = {},
            i =
              ((n.n = "PRODUCT_VIEWS"),
                (n.u = a.href),
                (n.d = path.host),
                (n.r = r.referrer || null),
                e && e.meta && (n.m = JSON.stringify(e.meta)),
                (n.p = JSON.stringify(rData)),
                new XMLHttpRequest());
          i.open("POST", l, !0),
            i.setRequestHeader("Content-Type", "text/plain"),
            i.send(JSON.stringify(n)),
            (i.onreadystatechange = function () {
              4 === i.readyState && e && e.callback && e.callback();
            });
        }
        oldProduct.push(val.product_id);
      });
    }
  }
  var e = (window.plausible && window.plausible.q) || [];
  window.plausible = t;
  for (var n, i = 0; i < e.length; i++) t.apply(this, e[i]);

  function p() {
    n !== a.pathname && ((n = a.pathname), t("pageview"));
  }
  var c,
    w = window.history;
  w.pushState &&
    ((c = w.pushState),
      (w.pushState = function () {
        c.apply(this, arguments), p();
      }),
      window.addEventListener("popstate", p)),
    "prerender" === r.visibilityState
      ? r.addEventListener("visibilitychange", function () {
        n || "visible" !== r.visibilityState || p();
      })
      : p();
}

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;//random number between 0 and 16
    if (d > 0) {//Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}