
## el-button 按钮
    属性: 
    type  类型  primary / success / warning / danger / info / text
    size  尺寸
## el-cascader 级联选择器
options 属性指定选项数组即可渲染出一个级联选择器
v-model 绑定值
props 配置选项 label 指定标题  value 指定选项的值  children 指定选项的子选项
size 尺寸
placeholder 输入框内文本
expandTrigger 次级菜单的展开方式
## el-form el-form-item 表单
model 数据  
rules 表单验证规则
ref 获取表单的数据
label-width 标题的宽度
label  prop需要验证的属性

方法：
validate 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
validateField  对部分表单字段进行校验的方法
resetFields  对整个表单进行重置
## el-table el-table-column 表格
border 边框  show-header 是否显示表头  default-expand-all 是否默认展开所有行
data 表格渲染的数据 prop渲染的属性名 label 标题 type index  索引  prop 对应内容的属性名
width 宽度
align 居中

## el-tag标签
type 类型  colsable 标签是否可以移除  disable-transitions是否关闭动画 
close 关闭tag时触发的事件

## el-tree树形控件
default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点
data 展示数据
show-checkbox 节点是否可被选择
node-key="id" 每个树节点用来作为唯一标识的属性
props 配置选项  label 指定节点标签为节点对象的某个属性值  children	指定子树为节点对象的某个属性值  
方法：
getCheckedKeys 返回目前被选中的节点的 key 所组成的数组
getHalfCheckedKeys 返回目前半选中的节点的 key 所组成的数组

## el-pagination 分页
使用了size-change和current-change事件来处理页码大小和当前页变动时候触发的事件。page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项，[100, 200, 300, 400]表示四个选项，每页显示 100 个，200 个，300 个或者 400 个
page-size 每页显示条目个数
total 总条目数
current-page.sync 当前页数
page-size 每页显示个数
page-sizes 每页显示个数选项
size-change	pageSize 改变时会触发
current-change	currentPage 改变时会触发

## el-alert 警告
title 文本  type 类型 effect 主题  closable 是否可关闭  close-text关闭文本
## messagebox弹框
调用$confirm方法即可打开消息提示，它模拟了系统的 confirm。Message Box 组件也拥有极高的定制性，我们可以传入options作为第三个参数，它是一个字面量对象。type字段表明消息类型，可以为success，error，info和warning，无效的设置将会被忽略。注意，第二个参数title必须定义为String类型，如果是Object，会被理解为options。在这里我们用了 Promise 来处理后续响应

## navmenu导航菜单
el-menu el-submenu el-menu-item-group el-menu-item
default-active 当前激活菜单的 index
open 展开指定的 sub-menu
close 收起指定的 sub-menu
collapse 是否水平折叠收起菜单

## tabs标签页
el-tabs el-tab-pane
type 风格类型
label 标题
closable 标签是否可关闭
addable 标签是否可增加
editable 标签是否同时可增加和关闭

## breadcrumb 面包屑
el-breadcrumb el-breadcrumb-item

## dialog 对话框
el-dialog
title 标题
visible.sync 显示或隐藏

## tooltip 文字提示
el-tooltip 
使用content属性来决定hover时的提示信息。由placement属性决定展示效果：placement属性值为：方向-对齐位置；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。如placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐

## steps 步骤条
el-steps el-step

## timeline 时间线
el-timeline el-timeline-item

## vue-table-with-tree-grid 
tree-table  template

