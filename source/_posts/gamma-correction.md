---
layout: post
title: Unreal/Unity中的Gamma校正
date: 2014/12/24
tags: [Unreal,Unity]
---

之前桌子跟我讲了一个很冷的小知识：对于3D美术来说，做贴图的时候如果想要做50%灰，应该用186/255而不是127/255。这个很有意思，稍微想了下应该是和Gamma校正有关，然后算了下确实是这样的。后来我分别在Unreal里和Unity里试了下，谨以此文记录。

<!--more-->

# 名词解释

具体Gamma Correction(伽马校正/Gamma校正)相关内容可以参看klayge上的[gamma的传说](http://www.klayge.org/2011/02/26/gamma%E7%9A%84%E4%BC%A0%E8%AF%B4/)一文。如果把颜色亮度理解为能量的话，输入和输出中是非线性的对应关系，对应下图中的红线；但是计算的时候必须使用线性对应才对，对应绿线：

![gamma_lines](/images/gamma_lines.png)

具体的转换公式就是2.2了~如此就能理解为什么50%灰度是186: `pow(0.5, 1.0/2.2)*255`，这样才保证转换到线性空间后是0.5。

# Unreal

我分别做了127/255和186/255灰度图，导入到材质编辑器作为底色，即下表前两张

| 127/255(sRGB) | 127/255(RGB) | 127/255(RGB) |
|----------------------------------------------------------|----------------------------------------------------------|----------------------------------------------------------|
| ![gamma_127_sRGB](/images/gamma_127_sRGB.png) | ![gamma_186_sRGB](/images/gamma_186_sRGB.png) | ![gamma_127_sRGB](/images/gamma_127_sRGB.png) |

可以看到颜色明显不同；但是修改颜色空间之后，就基本一致了。Windows下默认的颜色空间是sRGB，也就是需要经过Gamma校正的。

![gamma_unreal](/images/gamma_unreal.png)

所以说最开始的说法，在默认情况下是成立的；但是Unreal也支持导入线性空间贴图，所以也能用127/255来表示50%灰。

插一句题外话就是Unreal其实在选颜色的地方也可以设置颜色空间，譬如下图中R通道的0.259其实对应的Gamma空间里的138/255。

![gamma_unreal](/images/gamma_unreal2.png)

# Unity

Unity文档里有一页叫[Linear Lighting](http://docs.unity3d.com/Manual/LinearLighting.html)对此进行了介绍：

- Existing (Gamma) Pipeline: 默认设置，完全不考虑颜色空间的转换，输入什么颜色就使用什么颜色，输出的时候也不考虑转换；这个方式相当于错上加错，虽然抵销掉一部分但依然是错的。
- Linear Lighting Pipeline: 输入的时候进行sRGB到RGB转换(利用硬件接口)，输出的时候再转回sRGB；这个才是正确地做法，但目前只支持Windows & Mac/XBox 360/PlayStation 3，令人忧郁

![gamma_unity_colorspace](/images/gamma_unity_colorspace.png)

简单做一个实验：读取127/255贴图亮度、乘以二后输出

| Gamma: 255 | Linear: 174 |
|--------------------------------------------------------------------------|----------------------------------------------------------------------------|
| ![gamma_unity_gammaspace](/images/gamma_unity_gammaspace.png) | ![gamma_unity_linearspace](/images/gamma_unity_linearspace.png) |

右边这张图的亮度相当于`pow(pow(0.5,2.2)*2, 1/2.2)*255`~

话说这样其实就没法在移动平台上做PBR，除非自己读取贴图的时候手动转一下，输出的时候再转一下~不过因为渲染管线不受控制，除非实现一个gamma correction的后处理，不然不好控制在最后转换，相当于多了个Pass...

总之从细节上来看Unity还是略输一筹啊~