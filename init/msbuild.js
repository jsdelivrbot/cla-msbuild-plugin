var reg = require('cla/reg');

reg.register('service.msbuild.script', {
    name: 'MSBuild',
    icon: '/plugin/cla-msbuild-plugin/icon/msbuild.svg',
    form: '/plugin/cla-msbuild-plugin/form/msbuild-form.js',
    handler: function(ctx, params) {
        var ci = require("cla/ci");
        var log = require('cla/log');
        var reg = require('cla/reg');
        var msbuildServer = params.server;
        var command = '';
        var msbuild = params.msbuild || '';
        var project = params.project || '';
        var switches = params.switches;
        var ciServer = ci.findOne({
            mid: msbuildServer + ''
        });
        if (!ciServer) {
            log.error(_("CI Server not found"));
            throw new Error(_('CI Server not found'));
        }
        command = '"' + msbuild + '"' + ' ' + '"' + project + '"' + ' ' + switches.join(" ");

        log.debug(_("Command MSBuild: ") + command);

        var output = reg.launch('service.scripting.remote', {
            name: 'Run MSBuild script',
            config: {
                errors: params.type,
                server: params.server,
                user: params.user,
                home: params.home,
                path: command,
                output_error: params.output_error,
                output_warn: params.output_warn,
                output_capture: params.output_capture,
                output_ok: params.output_ok,
                meta: params.meta,
                rc_ok: params.ok,
                rc_error: params.error,
                rc_warn: params.warn
            }
        });
        return output;
    }
});