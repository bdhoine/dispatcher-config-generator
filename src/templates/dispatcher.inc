/{{name}}
  {
{{> clientheaders }}

{{> virtualhosts }}

{{> sessionmanagement }}

{{> renders }}

{{> filter }}

{{> vanity-urls }}

{{> cache }}

{{> auth-checker }}

{{> statistics }}

{{> stickyconnections }}

{{> health-check }}

    {{#if propagate-synd-post}}
    /propagateSyndPost "{{propagate-synd-post}}"
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