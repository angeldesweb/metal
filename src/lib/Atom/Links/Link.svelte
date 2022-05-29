<script>
    import { user } from '../../../store'
    export let onClick;
    export let label = 'Link';
    export let id;
    export let roles = [];
</script>
{#if roles.length === 0}
<a
    style:z-index='2'
    {id}
    on:click={e => onClick(e)}
    href={null}
>
    {label}
</a>
{:else if roles.indexOf($user.role) >= 0}
<a
    style:z-index='2'
    {id}
    on:click={e => onClick(e)}
    href={null}
>
    {label}
</a>
{:else}
<div style:display="none"></div>
{/if}


