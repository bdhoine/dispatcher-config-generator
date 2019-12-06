/{{name}}
  {
    /clientheaders
      {
        {{#each client-headers as |client-header|}}
        "{{client-header}}"
        {{/each}}
      }

    /virtualhosts
      {
        {{#each virtual-hosts as |virtual-host|}}
        "{{virtual-host}}"
        {{/each}}
      }

    {{#if session-management}}
    /sessionmanagement
      {
        /directory "{{session-management.directory}}"
        {{#if session-management.encode}}
        /encode "{{session-management.encode}}"
        {{/if}}
        {{#if session-management.header}}
        /header "{{session-management.header}}"
        {{/if}}
        {{#if session-management.timeout}}
        /timeout "{{session-management.timeout}}"
        {{/if}}
      }
    {{/if}}

    /renders
      {
        {{#each renderers as |renderer i|}}
        /renderer{{i}}
          {
            /hostname "{{renderer.hostname}}"
            /port "{{renderer.port}}"
            {{#if renderer.timeout includeZero=true}}
            /timeout "{{renderer.timeout}}"
            {{/if}}
            {{#if renderer.receive-timeout includeZero=true}}
            /receiveTimeout "{{renderer.receive-timeout}}"
            {{/if}}
            {{#if renderer.ipv4 includeZero=true}}
            /ipv4 "{{renderer.ipv4}}"
            {{/if}}
            {{#if renderer.secure includeZero=true}}
            /secure "{{renderer.secure}}"
            {{/if}}
          }
        {{/each}}
      }

    /filter
      {
        {{#each filters as |filter i|}}
        {{#if filter.glob}}
        /{{i}}
          {
            /type "{{filter.type}}"
            /glob "{{filter.glob}}"
          }
        {{else}}
        /{{i}}
          {
            /type "{{filter.type}}"
            {{#if filter.method}}
            /method "{{filter.method}}"
            {{/if}}
            {{#if filter.url}}
            /url "{{filter.url}}"
            {{/if}}
            {{#if filter.query}}
            /query "{{filter.query}}"
            {{/if}}
            {{#if filter.protocol}}
            /protocol "{{filter.protocol}}"
            {{/if}}
            {{#if filter.path}}
            /path "{{filter.path}}"
            {{/if}}
            {{#if filter.selectors}}
            /selectors '{{filter.selectors}}'
            {{/if}}
            {{#if filter.extension}}
            /extension '{{filter.extension}}'
            {{/if}}
            {{#if filter.suffix}}
            /suffix '{{filter.suffix}}'
            {{/if}}
          }
        {{/if}}
      {{/each}}
      }

    {{#if vanity-urls}}
    /vanity_urls
      {
        /url "/libs/granite/dispatcher/content/vanityUrls.html"
        /file "{{vanity-urls.file}}"
        /delay "{{vanity-urls.delay}}"
      }
    {{/if}}

    /cache
      {
        /docroot "{{cache.doc-root}}"

        /rules
        {
          {{#each cache.rule as |rule i|}}
          /{{i}}
          {
            /type "{{rule.type}}"
            /glob "{{rul.glob}}"
          }
          {{/each}}
        }

        /allowedClients
        {
          {{#each cache.allowed-clients as |allowed-client i|}}
          /{{i}}
          {
            /type "{{allowed-client.type}}"
            /glob "{{allowed-client.glob}}"
          }
          {{/each}}
        }

        {{#if cache.invalidate}}
        /invalidate {
        {
          {{#each cache.invalidate as |invalidate i|}}
          /{{i}}
          {
            /type "{{invalidate.type}}"
            /glob "{{invalidate.glob}}"
          }
          {{/each}}
        }
        {{/if}}

        {{#if cache.stat-file}}
        /statfile "{{cache.stat-file}}"
        {{/if}}
        {{#if cache.serve-stale-on-error includeZero=true}}
        /serveStaleOnError "{{cache.serve-stale-on-error}}"
        {{/if}}
        {{#if cache.allow-authorized includeZero=true}}
        /allowAuthorized "{{cache.allow-authorized}}"
        {{/if}}
        {{#if cache.stat-files-level}}
        /statfileslevel "{{cache.stat-files-level}}"
        {{/if}}
        {{#if cache.invalidate-handler}}
        /invalidateHandler "{{cache.invalidate-handler}}"
        {{/if}}

        {{#if cache.ignore-url-parameters}}
        /ignoreUrlParams
        {
          {{#each cache.ignore-url-parameters as |ignore-url-parameter i|}}
          /{{i}}
          {
            /type "{{ignore-url-parameter.type}}"
            /glob "{{ignore-url-parameter.glob}}"
          }
          {{/each}}
        }
        {{/if}}

        {{#if cache.headers}}
        /headers
          {
            {{#each cache.headers as |header|}}
            "{{header}}"
            {{/each}}
          }
        {{/if}}

        {{#if cache.grace-period}}
        /gracePeriod "{{cache.grace-period}}"
        {{/if}}
        {{#if cache.enable-ttl includeZero=true}}
        /enableTTL "{{cache.enable-ttl}}"
        {{/if}}
      }

    {{#if propagate-synd-post}}
    /propagateSyndPost "{{propagate-synd-post}}"
    {{/if}}

    {{#if auth-checker}}
    /auth_checker {

      /url "{{auth-checker.url}}"

      /filter
        {
          {{#each auth-checker.filter as |filter i|}}
          /{{i}}
          {
            /type "{{filter.type}}"
            /glob "{{filter.glob}}"
          }
          {{/each}}
        }

      /headers
        {
          {{#each auth-checker.headers as |headers i|}}
          /{{i}}
          {
            /type "{{headers.type}}"
            /glob "{{headers.glob}}"
          }
          {{/each}}
        }
    }
    {{/if}}

    {{#if statistics}}
    /statistics {
      /categories {
        {{#each statistics as |statistic|}}
        /{{statistic.category}}
          {
            /glob "{{statistic.glob}}"
          }
        {{/each}}
      }
    }
    {{/if}}

    {{#if sticky-connections}}
    /stickyConnections
      {
        /paths
          {
            {{#each sticky-connections as |sticky-connection|}}
            "{{sticky-connection}}"
            {{/each}}
          }
      }
    {{/if}}

    {{#if sticky-connections-for}}
    /stickyConnectionsFor "{{sticky-connections-for}}"
    {{/if}}
    {{#if health-check-url}}
    /health_check
      {
        /url "{{health-check-url}}"
      }
    {{/if}}
    {{#if retry-delay}}
    /retryDelay "{{retry-delay}}"
    {{/if}}
    {{#if number-of-retries}}
    /numberOfRetries "{{number-of-retries}}"
    {{/if}}
    {{#if failover includeZero=true}}
    /failover "{{failover}}"
    {{/if}}
    {{#if unavailable-penalty}}
    /unavailablePenalty "{{unavailable-penalty}}"
    {{/if}}

  }