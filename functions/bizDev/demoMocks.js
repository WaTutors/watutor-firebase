
/**
 * mockup of the stripe express payments page
 *
 * used for demos involving payments
 */
exports.stripeExpressMockUpTemp = async (req, res) => {
  try {
    res.status(200).send(
      `
  <!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta charset="utf-8">
      <title>Stripe</title>
      <meta name="robots" content="noindex, nofollow">
  <meta name="googlebot" content="noindex, nofollow, noarchive">

      <script nonce="JjMJJ8JGQvyjVQboIf7+pA==">
  !function() {
    var APP_NAME = 'connect_express';
    var TINY_PRELOADED_CSRF_REGEX = /csrf_token&quot;:&quot;([^&]+)&quot;/;
    var OAUTH_CONFIG_CSRF_REGEX = /csrf&quot;:&quot;([^&]+)&quot;/;
    var ENDPOINT = '/ajax/load_error_report';

    var failedJSScriptSrcs = [];
    var failedCSSScriptHrefs = [];
    var mutationObserver = null;

    function extractCSRFToken() {
      var tinyPreloaded = document.getElementById('tiny_preloaded_json');
      if (tinyPreloaded) {
        var m = tinyPreloaded.textContent.match(TINY_PRELOADED_CSRF_REGEX);
        return m ? m[1] : null;
      }

      var oauthConfig = document.getElementById('oauth_config');
      if (oauthConfig) {
        var m = oauthConfig.textContent.match(OAUTH_CONFIG_CSRF_REGEX);
        return m ? m[1] : null;
      }

      return null;
    }

    function stripeJSLoadError(e) {
      if (e.target && e.target.src) {
        failedJSScriptSrcs.push(e.target.src);
      }
    }

    function stripeCSSLoadError(e) {
      if (e.target && e.target.href) {
        failedCSSScriptHrefs.push(e.target.href);
      }
    }

    if ('MutationObserver' in window) {
      mutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          var script;
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            script = mutation.addedNodes[i];
            if (script.nodeName === 'SCRIPT') {
              script.addEventListener('error', stripeJSLoadError, false);
            }
            if (script.nodeName === 'LINK') {
              script.addEventListener('error', stripeCSSLoadError, false);
            }
          }
        });
      })
      mutationObserver.observe(document, {childList: true, subtree: true});
    }

    window.addEventListener('load', function (e) {
      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }

      if (failedJSScriptSrcs.length || failedCSSScriptHrefs.length) {
        var csrfToken = extractCSRFToken();
        var data = new FormData();
        data.append('app', APP_NAME);
        for (var i = 0; i < failedJSScriptSrcs.length; i++) {
          data.append('scripts[]', failedJSScriptSrcs[i]);
        }

        for (var i = 0; i < failedCSSScriptHrefs.length; i++) {
          data.append('css[]', failedCSSScriptHrefs[i]);
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', ENDPOINT);
        xhr.setRequestHeader('x-stripe-csrf-token', csrfToken)
        xhr.send(data);
      }
    })
  }();
  </script>

      <link rel="stylesheet" href="https://b.stripecdn.com/manage/assets/connect_express.ebda09e5582bb8ad74cd.css">

  <style>
  html {
    background-color: #F8FAFC;
  }
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }

  @media screen and (max-width: 460px) {
    html {
      background-color: #ffffff;
    }
  }
  </style>


      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0">
    </head>
    <body>
      <div id="connect-light"></div>
      <script src="https://js.stripe.com/v3/" ></script>

      <script type="application/json" id="preloaded_json">{&quot;accept_language&quot;:&quot;en-US,en;q=0.9&quot;,&quot;flow&quot;:&quot;update&quot;,&quot;flags&quot;:{&quot;ark_document_upload_guided_flow&quot;:false,&quot;ark_perform_realtime_verification_status_check&quot;:false,&quot;connect_express_dashboard_payout_details&quot;:false,&quot;connect_onboarding_use_previously_due_from_api&quot;:false,&quot;connect_taxes_review_tax_information&quot;:false,&quot;disable_express_dashboard_payouts_tab&quot;:false,&quot;emea_onboarding_allow_capture&quot;:true,&quot;enable_le_sharing&quot;:false,&quot;enable_le_cloning&quot;:false,&quot;enable_multiple_bank_accounts&quot;:false,&quot;express_dashboard_verify_uses_composition_router&quot;:false,&quot;express_onboarding_legal_entity_selection&quot;:true,&quot;force_bank_account&quot;:false,&quot;show_hosted_tax_documents&quot;:false,&quot;show_hosted_tax_w9&quot;:false,&quot;use_gelato_verification_iframe&quot;:false,&quot;external_account_direct_debit_agreement_collection_eur&quot;:true,&quot;external_account_direct_debit_agreement_collection_settings_eur&quot;:true,&quot;external_account_direct_debit_agreement_collection_gbp&quot;:true,&quot;external_account_direct_debit_agreement_collection_settings_gbp&quot;:true,&quot;external_account_direct_debit_agreement_collection_aud&quot;:true,&quot;external_account_direct_debit_agreement_collection_settings_aud&quot;:true,&quot;external_account_direct_debit_agreement_collection_nzd&quot;:true,&quot;external_account_direct_debit_agreement_collection_settings_nzd&quot;:true,&quot;new_bank_account_form_at&quot;:false,&quot;new_bank_account_form_au&quot;:false,&quot;new_bank_account_form_be&quot;:false,&quot;new_bank_account_form_bg&quot;:false,&quot;new_bank_account_form_br&quot;:false,&quot;new_bank_account_form_ca&quot;:false,&quot;new_bank_account_form_ch&quot;:false,&quot;new_bank_account_form_cy&quot;:false,&quot;new_bank_account_form_cz&quot;:false,&quot;new_bank_account_form_de&quot;:false,&quot;new_bank_account_form_dk&quot;:false,&quot;new_bank_account_form_ee&quot;:false,&quot;new_bank_account_form_es&quot;:false,&quot;new_bank_account_form_fi&quot;:false,&quot;new_bank_account_form_fr&quot;:false,&quot;new_bank_account_form_gb&quot;:false,&quot;new_bank_account_form_gr&quot;:false,&quot;new_bank_account_form_hk&quot;:false,&quot;new_bank_account_form_id&quot;:true,&quot;new_bank_account_form_ie&quot;:false,&quot;new_bank_account_form_in&quot;:false,&quot;new_bank_account_form_it&quot;:false,&quot;new_bank_account_form_jp&quot;:false,&quot;new_bank_account_form_lt&quot;:false,&quot;new_bank_account_form_lu&quot;:false,&quot;new_bank_account_form_lv&quot;:false,&quot;new_bank_account_form_mt&quot;:false,&quot;new_bank_account_form_mx&quot;:false,&quot;new_bank_account_form_my&quot;:false,&quot;new_bank_account_form_nl&quot;:false,&quot;new_bank_account_form_no&quot;:false,&quot;new_bank_account_form_nz&quot;:false,&quot;new_bank_account_form_pl&quot;:false,&quot;new_bank_account_form_pt&quot;:false,&quot;new_bank_account_form_ro&quot;:false,&quot;new_bank_account_form_se&quot;:false,&quot;new_bank_account_form_sg&quot;:false,&quot;new_bank_account_form_si&quot;:false,&quot;new_bank_account_form_sk&quot;:false,&quot;new_bank_account_form_us&quot;:false},&quot;supports_debit_card&quot;:true,&quot;csrf_token&quot;:&quot;IJFcPgUUCQYJ2LMZX-oIDRukCdvsaHAUf30pyOQnPGZ58QOYEwxYT2PlOvtn1ZFYncVwaYhb5QJ00YYdns7uSA==&quot;,&quot;admin&quot;:false,&quot;application&quot;:{&quot;enabled_countries&quot;:[&quot;AT&quot;,&quot;AU&quot;,&quot;BE&quot;,&quot;CA&quot;,&quot;CH&quot;,&quot;DE&quot;,&quot;DK&quot;,&quot;EE&quot;,&quot;ES&quot;,&quot;FI&quot;,&quot;FR&quot;,&quot;GB&quot;,&quot;GR&quot;,&quot;HK&quot;,&quot;IE&quot;,&quot;IT&quot;,&quot;JP&quot;,&quot;LT&quot;,&quot;LU&quot;,&quot;LV&quot;,&quot;NL&quot;,&quot;NO&quot;,&quot;NZ&quot;,&quot;PL&quot;,&quot;PT&quot;,&quot;SE&quot;,&quot;SG&quot;,&quot;SI&quot;,&quot;SK&quot;,&quot;US&quot;,&quot;MY&quot;],&quot;token&quot;:&quot;ca_AdFsX9nx1eF8o23XyNCO2sqw6KReyb4O&quot;,&quot;livemode&quot;:false,&quot;name&quot;:&quot;WaTutor Demo&quot;,&quot;icon&quot;:&quot;https://files.stripe.com/links/fl_test_posuscaMke7szL8qoiD5GiGj&quot;,&quot;color&quot;:&quot;#27BB86&quot;},&quot;platform&quot;:{&quot;support_email&quot;:&quot;romain+watutor@stripe.com&quot;,&quot;token&quot;:&quot;acct_1AHy7eG7W0qHnkNF&quot;},&quot;prefill&quot;:{&quot;phone&quot;:null,&quot;stripe_user&quot;:{},&quot;first_name&quot;:null,&quot;last_name&quot;:null,&quot;business_type&quot;:null,&quot;suggested_capabilities&quot;:null,&quot;tos_acceptance&quot;:null,&quot;email&quot;:null},&quot;redirect_uri&quot;:&quot;https://watutor.io/pilots/dashboard&quot;,&quot;publishable_key&quot;:&quot;pk_test_51HB3xtLk2iwTIr6iCOCAgZjWzslcJF8yps2clUI02Y3sRQMoFxzMyCasr7Ri7Pq5EdOwAJQGgPHrfLGLrLR7SkK400Qabnm2nc&quot;,&quot;oauth_state&quot;:null,&quot;hosts&quot;:{&quot;api&quot;:&quot;https://api.stripe.com&quot;,&quot;connect&quot;:&quot;https://connect.stripe.com&quot;,&quot;dashboard&quot;:&quot;https://dashboard.stripe.com&quot;,&quot;site&quot;:&quot;https://stripe.com&quot;,&quot;support&quot;:&quot;https://support.stripe.com&quot;,&quot;u2f_facets&quot;:&quot;https://dashboard.stripe.com&quot;,&quot;uploads&quot;:&quot;https://files.stripe.com&quot;},&quot;edit_link_code&quot;:&quot;srfWiwCsGaQY&quot;,&quot;available_locales&quot;:[&quot;da-DK&quot;,&quot;de-DE&quot;,&quot;en-AU&quot;,&quot;en-CA&quot;,&quot;en-GB&quot;,&quot;en-IE&quot;,&quot;en-IN&quot;,&quot;en-NZ&quot;,&quot;en-SG&quot;,&quot;en-US&quot;,&quot;es-ES&quot;,&quot;es-419&quot;,&quot;fi-FI&quot;,&quot;fr-FR&quot;,&quot;fr-CA&quot;,&quot;it-IT&quot;,&quot;ja-JP&quot;,&quot;nb-NO&quot;,&quot;nl-NL&quot;,&quot;pl-PL&quot;,&quot;pt-BR&quot;,&quot;pt-PT&quot;,&quot;sv-SE&quot;,&quot;zh-Hans&quot;,&quot;zh-Hant-HK&quot;,&quot;ms-MY&quot;],&quot;has_legacy_payments&quot;:false,&quot;has_paused_payouts&quot;:false,&quot;locale&quot;:{&quot;auto_locale&quot;:true,&quot;locale&quot;:&quot;en-US&quot;},&quot;onboarding_config&quot;:null,&quot;previously_due&quot;:[&quot;business_profile.url&quot;,&quot;business_type&quot;,&quot;external_account&quot;,&quot;individual.first_name&quot;,&quot;individual.last_name&quot;,&quot;tos_acceptance.date&quot;,&quot;tos_acceptance.ip&quot;],&quot;required_auth&quot;:{&quot;access&quot;:{&quot;factor&quot;:null},&quot;switch_account&quot;:{&quot;factor&quot;:&quot;phone_code&quot;},&quot;edit_external_account&quot;:{&quot;factor&quot;:&quot;phone_code&quot;},&quot;see_payouts&quot;:{&quot;factor&quot;:null},&quot;edit_email&quot;:{&quot;factor&quot;:&quot;phone_code&quot;},&quot;edit_phone&quot;:{&quot;factor&quot;:&quot;email_code&quot;},&quot;edit_tax_settings&quot;:{&quot;factor&quot;:&quot;phone_code&quot;},&quot;edit_team&quot;:{&quot;factor&quot;:&quot;phone_code&quot;},&quot;redeem_invite&quot;:{&quot;factor&quot;:null},&quot;login_support&quot;:{&quot;factor&quot;:&quot;email_code&quot;}},&quot;session_api_key&quot;:&quot;luk_HkZ661GqydiiW4Ery7q5PzIIrVImITEc00nHpbkYab&quot;,&quot;light_session_id&quot;:&quot;ls_HkZ6t5xd86gkL0&quot;,&quot;experiments&quot;:{&quot;hvform_sg_hk_direct_onboarding&quot;:false,&quot;hvform_ca_direct_onboarding&quot;:false,&quot;growth_experiments_developer_integration_wizard&quot;:false,&quot;nux_charter_metric_survey&quot;:true,&quot;nux_email_verification&quot;:true,&quot;nux_rc_home_messaging_rollout&quot;:false,&quot;nux_recently_viewed_docs&quot;:false,&quot;growth_register_page_startup_labels&quot;:false,&quot;product_adoption_rfft_post_dispute_promo&quot;:false,&quot;connect_accounts_overview_use_graphql&quot;:false,&quot;test_experiment_2&quot;:false,&quot;aa_test_experiment&quot;:true,&quot;instant_payouts_setting_copy_change&quot;:false,&quot;instant_payouts_button_design&quot;:false,&quot;revenue_recognition_promotion&quot;:false,&quot;billing_analytics_mrr_product_plan&quot;:true,&quot;test_experiment_filter_0&quot;:true,&quot;dashboard_faucet_redux_perf&quot;:false,&quot;dashboard_webpack_build_experiment&quot;:false,&quot;dashboard_preloaded_optimizations&quot;:true,&quot;dashboard_sidenav_less_work&quot;:true,&quot;dashboard_preload_early_2&quot;:false,&quot;dashboard_eager&quot;:true,&quot;dashboard_dont_animate_on_first_render&quot;:false,&quot;dashboard_harsher_interativity_detector&quot;:true,&quot;dashboard_disable_sidenav_animation_for_business&quot;:false,&quot;dashboard_optimize_chrome&quot;:false,&quot;emea_onboarding_new_address_document_upload&quot;:true,&quot;idprod_dashboard_replace_jumio_iframe&quot;:false,&quot;hvform_us_direct_onboarding&quot;:true,&quot;hvform_eu_direct_onboarding&quot;:true,&quot;hvform_br_direct_onboarding&quot;:true,&quot;hvform_my_direct_onboarding&quot;:false,&quot;hvform_jp_direct_onboarding&quot;:false,&quot;hvform_row_direct_settings&quot;:true,&quot;hvform_sepa_au_nz_direct_settings&quot;:false,&quot;i18n_dashboard_messages_logging&quot;:false,&quot;sigma_reports_upsell&quot;:false,&quot;dashboard_payments_refresh&quot;:false,&quot;terminal_hardware_orders_too_complicated_returns&quot;:false,&quot;analytics_id_holdback&quot;:false,&quot;merchant_token_holdback&quot;:false},&quot;treatments&quot;:{&quot;hvform_sg_hk_direct_onboarding&quot;:&quot;control&quot;,&quot;hvform_ca_direct_onboarding&quot;:&quot;control&quot;,&quot;growth_experiments_developer_integration_wizard&quot;:&quot;control&quot;,&quot;nux_charter_metric_survey&quot;:&quot;recommendation_survey_a&quot;,&quot;nux_email_verification&quot;:&quot;treatment&quot;,&quot;nux_rc_home_messaging_rollout&quot;:&quot;control&quot;,&quot;nux_recently_viewed_docs&quot;:&quot;control&quot;,&quot;growth_register_page_startup_labels&quot;:&quot;control&quot;,&quot;product_adoption_rfft_post_dispute_promo&quot;:&quot;control&quot;,&quot;connect_accounts_overview_use_graphql&quot;:&quot;control&quot;,&quot;test_experiment_2&quot;:&quot;control&quot;,&quot;aa_test_experiment&quot;:&quot;treatment_2&quot;,&quot;instant_payouts_setting_copy_change&quot;:&quot;control&quot;,&quot;instant_payouts_button_design&quot;:&quot;control&quot;,&quot;revenue_recognition_promotion&quot;:&quot;control&quot;,&quot;billing_analytics_mrr_product_plan&quot;:&quot;treatment&quot;,&quot;test_experiment_filter_0&quot;:&quot;treatment&quot;,&quot;dashboard_faucet_redux_perf&quot;:&quot;control&quot;,&quot;dashboard_webpack_build_experiment&quot;:&quot;control&quot;,&quot;dashboard_preloaded_optimizations&quot;:&quot;treatment&quot;,&quot;dashboard_sidenav_less_work&quot;:&quot;treatment&quot;,&quot;dashboard_preload_early_2&quot;:&quot;control&quot;,&quot;dashboard_eager&quot;:&quot;treatment&quot;,&quot;dashboard_dont_animate_on_first_render&quot;:&quot;control&quot;,&quot;dashboard_harsher_interativity_detector&quot;:&quot;treatment&quot;,&quot;dashboard_disable_sidenav_animation_for_business&quot;:&quot;control&quot;,&quot;dashboard_optimize_chrome&quot;:&quot;control&quot;,&quot;emea_onboarding_new_address_document_upload&quot;:&quot;treatment&quot;,&quot;idprod_dashboard_replace_jumio_iframe&quot;:&quot;control&quot;,&quot;hvform_us_direct_onboarding&quot;:&quot;treatment&quot;,&quot;hvform_eu_direct_onboarding&quot;:&quot;treatment&quot;,&quot;hvform_br_direct_onboarding&quot;:&quot;treatment&quot;,&quot;hvform_my_direct_onboarding&quot;:&quot;control&quot;,&quot;hvform_jp_direct_onboarding&quot;:&quot;control&quot;,&quot;hvform_row_direct_settings&quot;:&quot;treatment&quot;,&quot;hvform_sepa_au_nz_direct_settings&quot;:&quot;control&quot;,&quot;i18n_dashboard_messages_logging&quot;:&quot;control&quot;,&quot;sigma_reports_upsell&quot;:&quot;control&quot;,&quot;dashboard_payments_refresh&quot;:&quot;control&quot;,&quot;terminal_hardware_orders_too_complicated_returns&quot;:&quot;control&quot;},&quot;geoip_country&quot;:&quot;US&quot;,&quot;read_only_admin&quot;:false,&quot;merchant&quot;:{&quot;business_name&quot;:null},&quot;stripe_account&quot;:{&quot;owner&quot;:{&quot;token&quot;:&quot;usr_HkZ6lMAQZfneQ4&quot;},&quot;owners&quot;:[{&quot;token&quot;:&quot;usr_HkZ6lMAQZfneQ4&quot;}]},&quot;user&quot;:null}</script>
      <script type="application/json" id="tiny_preloaded_json">{&quot;cdn_base_url&quot;:&quot;https://b.stripecdn.com/manage&quot;,&quot;csrf_token&quot;:&quot;CoDL-JdumJszf1_FqUx4lEFMd8OLn755vU2Sj-aZzbFT4JRegXbJ0llC1ieRc-HBxy0Oce-sK2-24T1anHAfnw==&quot;,&quot;current_head&quot;:&quot;9f93def80cf457d6e23f3434b7a75bb6c0ec407f&quot;,&quot;current_version&quot;:&quot;2020-03-02&quot;,&quot;host_set&quot;:&quot;default&quot;,&quot;js_base_url&quot;:&quot;https://b.stripecdn.com/manage/assets/&quot;,&quot;sentry_enabled&quot;:true,&quot;sentry_projects&quot;:{&quot;dashboard_platform&quot;:&quot;https://2c9d67d04892426ab2c02b9958953e15@errors.stripe.com/7&quot;,&quot;developer_products&quot;:&quot;https://e8205334b22944a8a30b339d219b325c@errors.stripe.com/267&quot;,&quot;payments_dashboard&quot;:&quot;https://cdde896176af4cf787aca547768904fe@errors.stripe.com/269&quot;,&quot;terminal&quot;:&quot;https://40a30b4473ea43509b61eda0024fd8a2@errors.stripe.com/271&quot;,&quot;atlas&quot;:&quot;https://ed68af4cb70541eda554e01372542a06@errors.stripe.com/272&quot;,&quot;bank_connections&quot;:&quot;https://9fb6846e4b4542dea75ace7e1570de15@errors.stripe.com/367&quot;,&quot;climate&quot;:&quot;https://2225b2409b274ba28f86dd1500df9b80@errors.stripe.com/400&quot;,&quot;emerald&quot;:&quot;https://63ba7ae545264498ab3bce45317f3812@errors.stripe.com/276&quot;,&quot;emerald_banking&quot;:&quot;https://ce6fba07eeaa4bdd99ffd52dc96de8b6@errors.stripe.com/335&quot;,&quot;platform_experience&quot;:&quot;https://cb6868a2387b4cba82027fd8d7a2fd6e@errors.stripe.com/277&quot;,&quot;connect_apps&quot;:&quot;https://cb6868a2387b4cba82027fd8d7a2fd6e@errors.stripe.com/277&quot;,&quot;account_experience&quot;:&quot;https://52f8101b6d0a44e2ab120943aa489aee@errors.stripe.com/278&quot;,&quot;security_products&quot;:&quot;https://e0cad97696704d51bf173a88ebc06cc4@errors.stripe.com/287&quot;,&quot;ruxp&quot;:&quot;https://b07faf88bde9438096f5fe593f3af14d@errors.stripe.com/302&quot;,&quot;invoices&quot;:&quot;https://6d8c4b388926455c8525989a3dd634e4@errors.stripe.com/307&quot;,&quot;subscriptions&quot;:&quot;https://f3e0a2437d0247fabf6ce23ab0ea5f9d@errors.stripe.com/306&quot;,&quot;customers&quot;:&quot;https://f3e0a2437d0247fabf6ce23ab0ea5f9d@errors.stripe.com/306&quot;,&quot;coupons&quot;:&quot;https://f3e0a2437d0247fabf6ce23ab0ea5f9d@errors.stripe.com/306&quot;,&quot;products&quot;:&quot;https://f3e0a2437d0247fabf6ce23ab0ea5f9d@errors.stripe.com/306&quot;,&quot;billing&quot;:&quot;https://f3e0a2437d0247fabf6ce23ab0ea5f9d@errors.stripe.com/306&quot;,&quot;billx&quot;:&quot;https://c0757829041f47d789a1fc2e8fd024be@errors.stripe.com/318&quot;,&quot;billing_analytics&quot;:&quot;https://8df7e4664b0746e9ad6966cae5387df0@errors.stripe.com/279&quot;,&quot;revenue_recognition&quot;:&quot;https://8df7e4664b0746e9ad6966cae5387df0@errors.stripe.com/279&quot;,&quot;growth_product&quot;:&quot;https://8c13f30cb4e64d01a1e98f6f7c2b15b6@errors.stripe.com/313&quot;,&quot;gelato&quot;:&quot;https://38f7c50ce1ba495291d97fd64165f8c0@errors.stripe.com/339&quot;,&quot;radar&quot;:&quot;https://a5f5fc46665e4e3b93459bc24d178b5c@errors.stripe.com/161&quot;,&quot;resolution&quot;:&quot;https://3a5349dadaaa4fe99e95a06c9f83d220@errors.stripe.com/408&quot;,&quot;i18n&quot;:&quot;https://5bbdaf7e322149be926c9db3dde5cdfa@errors.stripe.com/369&quot;,&quot;nux&quot;:&quot;https://d299f6a6ea0a4c3d9b1dd7f244d8bc3d@errors.stripe.com/388&quot;,&quot;auth_opt&quot;:&quot;https://d43908be97e348019a089641caf9323d@errors.stripe.com/381&quot;,&quot;sigma&quot;:&quot;https://275a47d76fea4f37a420e42af28e339e@errors.stripe.com/157&quot;,&quot;capital&quot;:&quot;https://a815a170bf5a422d865dd7dbd1ce66fa@errors.stripe.com/394&quot;}}</script>
      <script src="https://b.stripecdn.com/manage/assets/config-a26fa4247b5444a88334e0863551d047.js" ></script>
      <script type="application/json" id="analytics_config">{&quot;ga&quot;:{&quot;isLoggedIn&quot;:true},&quot;merchant&quot;:null,&quot;user&quot;:null}</script>
        <script src="https://b.stripecdn.com/manage/assets/runtime~connect_express.a212a4e32fd5c1b194ef.min.js"></script>
    <script src="https://b.stripecdn.com/manage/assets/connect.vendors~connect_express.d854e87ea2485622299c.min.js"></script>
    <script src="https://b.stripecdn.com/manage/assets/connect.connect_express.f5efc2c28d3f96dd122a.min.js"></script>

    </body>
  </html>
  `,

    );
  } catch (error) {
    console.error('caught error', error);
  }
};
