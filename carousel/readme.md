# 一个轮播图的实现

## 起因

前端应该都写过轮播图的组件吧，即手动或自动地让图片切换到下一张。这里的这个轮播图就是我之前在一个活动页中使用的，并没有难度，唯一特殊的一点就是要让上方文字和下方图片同步变化。

文字需要实现这样的变化效果：
1. 文字从上至下移动至中央
2. 文字停留在中央显示区域
3. 文字由中央向下移动，逐渐消失
4. 下一段文字从上方移入，重复这一过程

对于图片，需要在文字移入过程中渐入显示；然后在文字消失过程中淡出。


## 变化效果的实现

因为文字是垂直移动，所以可以通过 `transform: translateY()` 来移动文字。同时给文字加上 `transition: 0.3s ease-in` 来展示动画效果。

```css
.banner-text {
  transition: 0.3s ease-in;
}

.banner-text.slide-in {
  transform: translateY(0);
  opacity: 1;
}

.banner-text.slide-out {
  transform: translateY(100%);
  opacity: 0;
}
```

图片是通过改变 `opacity` 来实现的。我们需要先定义名为 `fadeIn`, `fadeOut` 的两个 `keyframes`，分别用于图片显示与消失的过程。

```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

然后将它们作为 `animation` 的属性值应用到图片上即可。

```css
.album-image.fade-in {
  opacity: 1;
  animation: fadeIn 0.3s ease-in;
}

.album-image.fade-out {
  opacity: 0;
  animation: fadeOut 0.3s ease-in;
}
```


## 变化的阶段

对于任一段文字或图片的变化过程均可分为这样的三个阶段：

1. 移入阶段
2. 稳定显示阶段
3. 移出阶段

首先定义两个变量：
- `fadeDuration`：1，3阶段持续时间
- `steadyDuration` ：第2阶段持续时间

有一点需要注意，要让 `fadeDuration` 的值（这里是300ms）保持和 css 里动画持续时间（0.3s）保持一致。

可以计算出一个变化周期的长度为：`fadeDuration * 2 + steadyDuration`。默认状态下，页面显示第一张图片和第一段文字，之后我们用 `setInterval` 开启循环。

当我们打开页面的时候，会显示默认的图片和文字，它省去了第1阶段，而直接处于 第2阶段（稳定显示），然后延迟 `steadyDuration` 后然后进入第3阶段（移出阶段）。

因此每个 `setInterval` 循环中经历的过程是：
1. 当前文字稳定显示（第2阶段）
2. 当前文字移出（第3阶段）
3. 新的文字移入（第1阶段）

在当前文字移出之后，即第3阶段结束时，需要进行这样的操作：
对于文字，需要更换内容。
对于图片，需要改变其地址。

最后进入了第1阶段，此时我们的文字和图片已经更换成了新的内容，可以开始移入屏幕了。

## 存在的缺点

因为是利用 `setInterval` 控制，所以离开网页后，会出现文字和图片的变化不匹配的情况。


## More

> 图片的配色来自： https://colorhunt.co/palette/140057
>
> 图片生成：https://dummyimage.com/


