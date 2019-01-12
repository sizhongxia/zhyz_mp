const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    kinds: [{
      id: '5c1cab687e29fcb927859601',
      name: '鸡'
    }, {
      id: '5c1cab687e29fcb927859602',
      name: '鸭'
    }, {
      id: '5c1cab687e29fcb927859603',
      name: '鹅'
    }, {
      id: '5c1cab687e29fcb927859604',
      name: '猪'
    }],
    form: {
      kindId: '5c1cab687e29fcb927859601',
      kindName: '鸡'
    }
  },
  onLoad: function(options) {

  },
  kindPickerChange: function(e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var kind = _this.data.kinds[e.detail.value];
      form.kindId = kind.id;
      form.kindName = kind.name;
      _this.setData({
        form: form
      });
    }
  }
})