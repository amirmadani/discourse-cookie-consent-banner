import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
   function setGoogleTags(obj, e) {
    let status = (e === 'allow')? 'granted': 'denied';
    if (gtag) {
      gtag('consent', 'default', {
        'ad_storage': status,
        'ad_user_data': status,
        'ad_personalization': status,
        'analytics_storage': status
      });
    }
    if ( e !== 'allow' ) {
      obj.clearStatus();
    }
  }
  $(document).ready(function() {
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": settings.popup_background_color,
          "text": settings.popup_text_color
        },
        "button": {
          "background": settings.button_background_color,
          "text": settings.button_text_color
        }        
      },
      "onStatusChange": function(e, status) {
          setGoogleTags(this, e);
      },
      "onInitialise": function(e) {
          setGoogleTags(this, e);
      },
      "theme": settings.layout,
      "position": settings.position,
      "static": settings.static,
      "type": "opt-in",
      "content": {
        "message": settings.main_text,
        "allow": settings.allow_button_text,
        "deny": settings.deny_button_text,
        "link": settings.policy_link_text,
        "href": settings.policy_link_url,
        "target": settings.policy_link_target
      }
    });
  });
});
