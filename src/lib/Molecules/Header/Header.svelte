<script>
    import Link from "../../Atom/Links/Link.svelte";
    import NavSubMenus from "../Menus/NavSubMenus.svelte";
    import { router , auth, user } from '../../../store';
    import { signOut } from '../../../api/auth'

    const onClick = e => router.navigateTo(e.target.id);
    const endSession = async () => {
        try {
            await signOut();
            router.navigateTo('home')
            auth.deauthenticate()

        } catch (error) {
            alert(JSON.stringify(error));
        }
    }
    let menuNew = [
        {id:'n-material',label:'Material'},
        {id:'n-provider',label:'Proveedor'}
    ]
    let menuSearch = [
        {id:'s-material',label:'Material'},
        {id:'s-provider',label:'Proveedor'},
        {id:'s-inbounds',label:'Entradas'},
        {id:'s-outbounds',label:'Salidas'},
        {id:'s-sells',label:'Ventas',roles:['Dev','Adm']}
    ]
    let menuActions = [
        {id:'n-inbound',label:'Entrada de material'},
        {id:'n-outbound',label:'Salida de material'},
        {id:'n-sell',label:'Venta',roles:['Dev','Adm']}
    ]
    let menuAccounts = [
        {id:'a-users',label:'Listar usuarios'},
        {id:'n-user',label:'Crear usuario'},
        {id:'u-user',label:'Modificar usuario'}
    ]
</script>
<div class="navbar bg-base-100">
    <div class="flex-1">
        <a id="home" on:click={e => onClick(e)} href={null} class="btn btn-ghost normal-case text-xl">
            MetalRecuperadora
        </a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
            <NavSubMenus title="Nuevo">
                {#each menuNew as link}
                    <li class="list"><Link {...link} {onClick} /></li>
                {/each}
            </NavSubMenus>
            <NavSubMenus title="Buscar">
                {#each menuSearch as link}
                    <li class="list"><Link {...link} {onClick} /></li>
                {/each}
            </NavSubMenus>
            <NavSubMenus title="Acciones">
                {#each menuActions as link}
                    <li class="list"><Link {...link} {onClick} /></li>
                {/each}
            </NavSubMenus>
            {#if $user.role === 'Dev'}
            <NavSubMenus title="Cuentas">
                {#each menuAccounts as link}
                    <li class="list"><Link {...link} {onClick} /></li>
                {/each}
            </NavSubMenus>
            {/if}
        </ul>
        <div class="navbar-end">
            <a class="btn" href={null} on:click={endSession}>Cerrar</a>
        </div>
    </div>
</div>
{#if !$user.verified}
<div class="alert alert-warning shadow-lg">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Atención: Por favor valida tu correo electrónico para que puedas trabajar con esta app. (Revisa la bandeja de entrada de la dirección con la cual iniciaste sesión)</span>
    </div>
</div>
{/if}

<style>
    li.list { 
        z-index:3;;
    }
</style>
