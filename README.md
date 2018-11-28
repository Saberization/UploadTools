# UploadTools

Mini library for uploading files on the mobile side


## 依赖资源

- `dist/UploadTools.min.js`

## 使用方法

```js
UploadTools({
    url: 'http://58.221.196.11:9090/epoint-web-zwdt/rest/appzwfwAttach/attachUpload',
    data: {
        clientguid: '324fb87e-5557-4f04-a101-10ce391ed66e',
        attachname: 'fileImage',
        source: '本地上传',
        accountguid: '11a300a2-102d-4bac-8687-2c0903c5fe96'
    },
    files: [{
        name: 'fileImage',
        file: this.files[0]
    }],
    beforeSend: function() {
        console.log('beforeSend');
    },
    success: function(response) {
        console.log(response);
    },
    error: function() {
        console.log('error');
    },
    complete: function() {
        console.log('complete');
    }
});
```

#### 参数说明

| 参数 | 参数类型 | 说明 |
| ---- | ----- | ----- |
| url | String | `必填` 接口地址 |
| data | Object or String | `必填` 请求的数据 |
| type | String | 请求类别，GET或POST，默认为POST |
| success | Function | `必填` 成功回调 |
| error | Function | 失败回调 |
| complete | Function | 请求完成后的回调，不管是成功还是失败都会触发 |
| delay | Number | 延迟请求的时间，单位为毫秒，例如 500 |
| xRequestedWith | Boolean | 给请求加上 X-Requested-With 头部，默认为 false