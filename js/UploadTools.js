/*
 * @Author: guotq
 * @Date: 2018-11-28 14:26:19
 * @Last Modified by: guotq
 * @Last Modified time: 2018-11-28 16:12:57
 * @Description: Mini library for uploading files on the mobile side
 */

(function(global, factory) {
    typeof exports === 'object' && module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory()) : global.UploadTools = factory();
}(window, function() {
    const defaultSettings = {
        url: '',
        data: {},
        type: 'POST',
        beforeSend: function() {},
        success: function() {},
        error: function() {},
        complete: function() {},
        delay: 300,
        xRequestedWith: false,
        timeout: 0,
        accept: '*/*'
    };

    /**
     * 设置请求头
     * @param {Object} xhr XHR 
     * @param {Object} settings 配置项 
     */
    const setHeader = function(xhr, name, value) {
        xhr.setRequestHeader(name, value);
    };

    /**
     * 获取请求参数
     * @param {*} settings 配置项
     * @returns {Object} formdata
     */
    const getParams = function(settings) {
        let data = settings.data,
            files = settings.files;

        const formData = new FormData();

        if (data) {
            if (typeof data === 'string') {
                formData.append(data, '');
            }
            else if (typeof data === 'object') {
                for (let key in data) {
                    let item = data[key];
                    
                    if (item) {
                        formData.append(key, item);
                    }
                }
            }
        }

        if (Array.isArray(files) && files.length > 0) {
            for (const value of files) {
                formData.append(value.name, value.file);
            }
        }

        return formData;
    };

    /**
     * 发送请求前触发
     * @param {Object} settings 配置项
     */
    const beforeSend = function(settings) {
        const beforeSendCallback = settings.beforeSend;

        beforeSendCallback && typeof beforeSendCallback === 'function' && beforeSendCallback();
    };

    /**
     * 监听 xhr 状态
     * @param {Object} xhr XHR 
     * @param {Object} settings 配置项
     */
    const onreadystatechange = function(xhr, settings) {
        const success = settings.success,
            error = settings.error,
            complete = settings.complete;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                success && typeof success === 'function' && success(JSON.parse(xhr.response), xhr.status, xhr);

                complete && typeof complete === 'function' && complete();
            }
        };

        xhr.onerror = function(e) {
            error && typeof error === 'function' && error(e);
            complete && typeof complete === 'function' && complete();
        };
    };

    const UploadTools = function(settings) {
        const xhr = new XMLHttpRequest();

        settings = Object.assign(defaultSettings, settings);

        const delay = settings.delay,
            timeout = settings.timeout;

        if (timeout) {
            xhr.timeout = timeout;
        }
        xhr.open(settings.type, settings.url);
        // 触发 beforeSend
        beforeSend(settings);
        // 设置请求头
        setHeader(xhr, 'Accept', settings.accept);
        if (settings.xRequestedWith) {
            setHeader(xhr, 'X-Requested-With', 'XMLHttpRequest');
        }
        // 监听状态
        onreadystatechange(xhr, settings);

        if (delay) {
            let time = setTimeout(() => {
                xhr.send(getParams(settings));
                time = null;
            }, delay);
        }
        else {
            xhr.send(getParams(settings));
        }
    };

    return UploadTools;
}));