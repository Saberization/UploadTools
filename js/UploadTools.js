/*
 * @Author: guotq
 * @Date: 2018-11-28 14:26:19
 * @Last Modified by: guotq
 * @Last Modified time: 2018-11-28 14:54:01
 * @Description: Mini library for uploading files on the mobile side
 */

(function(global, factory) {
    typeof exports === 'object' && module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory()) : global.UploadTools = factory();
}(window, function() {
    const defaultSettings = {
        url: '',
        data: {},
        type: 'post',
        beforeSend: function() {},
        success: function() {},
        error: function() {},
        complete: function() {},
        delay: 300,
        xRequestedWith: false,
        timeout: 0 
    };

    const UploadTools = function(options) {
        options = Object.assign(defaultSettings, options);
        
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        console.log(options);
    };

    return UploadTools;
}));