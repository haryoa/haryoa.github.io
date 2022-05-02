---
image:
  src: https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80
  width: 1000   # in pixels
  height: 400   # in pixels
  alt: food image
author: haryoaw
title: Create Indonesian Recipe Generator by Fine-tuning T5, BART, and GPT-2  
date: 2022-05-01 12:00:00 +0700
categories: [Technical, Deep Learning]
tags: [tech, machine learning, deep learning, nlp]
pin: false
toc: true
---


<!-- !['test'](https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80){: width="800" height="400" }
_From [Unsplash](https://unsplash.com/photos/HlNcigvUi4Q) by Brooke Lark_
{: width="972" height="589" } -->
*An Indonesian recipe generator Deep Learning model trained by fine-tuning pre-trained models such as T5, BART, and GPT-2*

Hello Everyone! Welcome to my first technical post on my personal blog! In this post, I will write about 
one of my fun projects, Indonesia Recipe Generator. This is the continuation of my previous [medium post](https://pub.towardsai.net/recibrew-find-out-the-foods-ingredients-dbc2a4e37383) with more modern approach.

This post will tell you about the details about my experiment in creating Indonesia recipe generator. 

## Repository and Demo

I will provide the best model and also the code to train it.

Feel free to try and download it :) .

- 🤗 Huggingface Space (demo): [Space](https://huggingface.co/spaces/haryoaw/id-recigen)
- 🤗 Huggingface Model (download the model): [Model](https://huggingface.co/haryoaw/id-recigen-bart)
- ✨ Repository (to train the model): [GitHub repository](https://github.com/haryoa/idrecibrew2)

## Introduction

In the past, I created an Indonesia recipe generator in my [medium post](https://pub.towardsai.net/recibrew-find-out-the-foods-ingredients-dbc2a4e37383) by using a seq2seq Deep Learning approach such as Gated Recurrent Unit (GRU) and Transformers. I want to revisit my past work and improve it. So, this post will post some improvements from the previous one. 

The model in my previous post was raw and not pre-trained. So, it didn't have any prior knowledge to use in the training process. One of the improvements that can increase the quality of the model that I mentioned in my previous blog is using a pre-trained model. Many state-of-the-art research works implement it to improve the quality of the model from the non-pre-trained one. Moreover, currently, it's the era of the pre-trained model in Deep Learning. Nowadays, many pre-trained models appear and have outstanding results when the model is trained again (we call it `fine-tune`) on the target dataset. Therefore, it's intriguing to try it for my recipe generator project. 

In this experiment, I will use off-the-shelf publicly available pre-trained models. Since the data is in the Indonesian language, I need to use models pre-trained with the Indonesian data. They also need to handle sequence generation problems since the problem that I want to tackle is a text generation problem. I searched and only found T5, BART, and GPT models. Thus, I decided to experiment by using these models.

## Data, Preprocessing, Exploration Data Analysis

Since this is the continuation of my previous project, I use the same data that I used previously. Feel free to read more detail about it through my medium post below (click the image).

[!['test'](/assets/img/posts/id-recipe-generator/1.jpg){: width="800" height="200" }](https://pub.towardsai.net/recibrew-find-out-the-foods-ingredients-dbc2a4e37383)
_Click the image to visit my previous post~_


## Method

In this section, I will describe the models that I've tried and mentioned above. All of the models that I used are transformer-based model. I will briefly descibe about them.

> In the future, I plan to create a post about in-depth details about current popular pre-trained model 😃
> I will try to make a distinction about each of them, so it will be easier for you to understand them. 
{: .prompt-info }

### Bart

BART[^bart] is a transformer-based model that is pre-trained through learning a corrupted input. It has an encoder-decoder architecture like the Transformer model with a few modifications such as the replacement of the activation function.  There are several corrupted scenarios that the author of the BART tried. The released final system is a model which is trained through *sentence shuffling* and *token masking*. The idea is to make BART learn perturbation and have the capability of doing causal language modeling. To apply it to the system, I fine-tuned the model to the data.  Here is an illustration of how pre-trained BART was built.

![bart-model](/assets/img/posts/id-recipe-generator/2.jpg){: width="800" height="200" }
_BART pre-training. It uses corrupted input (sentence shuffling and token masking) to predict the uncorrupted one_

In this experiment, I used IndoBART[^indobart] as the pre-trained model, which is released in this paper. The model is pre-trained through the Indo4B dataset, Common Crawl, and Wikipedia. The data has Indonesian, Sundanese, and Javanese languages. It is available publicly in the Huggingface model.

### T5

T5[^t5] is also a transformer-based model that is pre-trained with a corrupted input. T5 is pre-trained by doing *token masking*. different from the BART which uses the data for causal language model training, T5 uses the training data as a seq2seq problem. The data may contain Translation, Question Answering, and Classification problems. The model is fed through learning those tasks with the addition of learning a corrupted input. Here is an illustration of how the model is pre-trained.

![bart-model](/assets/img/posts/id-recipe-generator/3.jpg){: width="800" height="200" }
_T5 pre-training. It use several tasks with a promptings style as the input of the model._

I used the T5 model which is available in the HuggingFace[^indot5]. It is pre-trained by using the Indonesian mC4 dataset.

### GPT

GPT-2[^GPT] is an auto-regressive pre-trained model that is pre-trained through causal language modeling that has no perturbation in the input (unlike BART and T5). Then, the pre-trained model is fine-tuned to our data. I used the IndoGPT model that is also released together with IndoBART in the same paper. The model is also pre-trained with the same data as IndoBART.

Since the model is not encoder-decoder architecture, we need to reshape our input and make it a language modeling problem.

## Setup

I will split this section into code technical setup, model setup, and hyperparameter setup.

### Code Technical Setup

To make the training script, I used Pytorch as the deep learning framework. I wrap them with Pytorch Lightning[^pl-lit]. I used
the implementation of Model Checkpoint, Early Stopping, 16-bit Precision from the Pytorch Lightning. 

For metric calculation, I used BLEU Score. BLEU Score is a popular metric for sequence-to-sequence problems. I use off-the-shelf BLEU score implementation from the `sacrebleu` Python package.

### Model Setup

I applied several modifications to the input of the model. For the architecture, I used an off-the-shelf implementation that
Huggingface provided.

For **GPT**, since it needs one input, I concated the food name and recipe into an input with a special symbol `>>>`.

```
Input: <FOOD> >>> <INGREDIENTS>
Output: Shift the input (e.g.: Input: `Apple Fruit end_of_token`, Output: `Fruit end_of_token`)
```
{: file="GPT Input Output" }

**T5** has seq2seq architecture, so I did a small modification to the input. From what I've read, T5 is pre-trained with a 'prompting' style of input. For example:
`input: summarize: <ARTICLE>`. So, I follow it and change the data to become like that. Below is how I present the input-output of the model

```
Input: resep: <FOOD>
Output: <INGREDIENTS>
```
{: file="T5 Input Output" }

I didn't do any changes in the **BART** model, so I provide the input and the output as-is.

```
Input: <FOOD>
Output: <INGREDIENTS>
```
{: file="BART Input Output" }

### Hyperparameter Setup

I used Adam as the optimizer technique. The learning rate varies depending on the architecture. I handpicked several learning-rate values based on several resources [^indobart][^t5][^hf-tutor] and I tried some of these values. 
I picked `1e-4`, `1e-5`, and `1e-4` as the learning rate of the model of GPT, BART, and T5 respectively. I used early stopping criteria to avoid model overfitting. It will stop training if the validation loss doesn't increase for 5 epochs. To pick the best model, I used the model that has the lowest validation loss. I used AdamW as the optimizer of the model.

To make the training faster, I used Automatic Mixed Precision (AMP) that Pytorch provided. Unfortunately, T5 can't use AMP. So, I didn't use AMP when I fine-tuned the T5 model. 

Following my past article, to make a fair comparison, I used the Greedy decoder as the decoding strategy to predict the output for each of the models. You can see the details about how a greedy decoder works in my past blog.

## Experiment Results

Below is the result of my experiment.

| Model                                              | BLEU Score           | Pretrained?|
|:---------------------------------------------------|:---------------------|------------|
| GRU Seq2seq + Attention (Past Experiment)          | 5.70                 | ❌         |
| Transformer (Past Experiment)                      | 16.24                | ❌         |
| IndoGPT                                            | 24.05                | ✅         |
| T5                                                 | 19.21                | ✅         |
| IndoBART                                           | 27.03                | ✅         |

With my setup, IndoBART outperforms other models. T5, IndoBART, and IndoGPT have higher BLEU score than the transformer vanilla.
It indicates that a pre-trained seq2seq model may help to increase the performance of the model. All of the models that are trained on Indobenchmark's data outperform the model that is trained on the C4 model (T5). It's interesting to see the potential of each pre-trained model.


## Analysis

In this section, I will provide several output samples across different basic ingredients in the data. I will also provide out-of-domain food to test the transfer learning capability. The samples are provided with the greedy search decoding strategy. The foods are taken from the test set.

| Food                                               | Scenario | IndoGPT     | IndoBART   | T5 | Ground Truth|
|:---------------------------------------------------|:---------|-------------|------------|----|-------------|
| mie goreng telur keju                              | egg( telur )  | 🍳 bahan utama <br> 1 bungkus mie goreng <br> 1 butir telur <br> 1 / 2 sdt garam <br> 1 sdt lada bubuk <br> 1 sdm kecap manis <br> 1 siung bawang putih <br> 1 buah bawang merah <br> 1 batang daun bawang <br> 1 lembar daun salam <br> 1 ruas jahe <br> 1 sachet saus tiram <br> 1 sendok teh gula <br> 1 gelas air <br> | 1 bungkus mie burung dara ( mie burung puyuh ) <br> 1 butir telur <br> 1 buah sosis <br> 1 / 2 buah keju cheddar <br> 1 siung bawang putih <br> 1 sdm kecap manis <br> 1 sdt saos tiram <br> secukupnya garam <br> secukupnya merica <br> secukupnya penyedap rasa <br> secukupnya air <br>        | 1 bungkus mie goreng ( saya pakai mie instan ) <br> 1 butir telur <br> 2 siung bawang putih <br> secukupnya garam <br> | 1 bungkus indomie goreng <br> 1 buah telur <br> 1 1 / 2 gelas belimbing air <br> 100 gram keju <br> |
| soup iga sapi                                      | sapi (beef)                  | an tulang iga sapi <br> 1 buah wortel <br> 1 / 2 buah kentang <br> 1 batang daun bawang <br> 1 ikat sawi hijau <br> 1 bungkus soup <br> 1 liter air <br> 1 sdm minyak goreng <br> bumbu halus : <br> 1 siung bawang putih <br> 1 sdt lada <br> 1 ruas jahe <br> 1 butir kemiri <br> 1 cm jahe <br>         | 1 kg iga sapi <br> 2 buah wortel <br> 2 batang daun bawang <br> 2 siung bawang putih <br> 1 / 2 sdt merica bubuk <br> 1 sdt garam <br> 1 sdm gula pasir <br> 1 buah tomat <br> 1 batang daun seledri <br> 1 ruas jahe <br> 1 btg daun bawang ( iris ) <br> 1 siung bawang bombay ( iris tipis ) <br> 2 sdm minyak goreng <br> | 1 kg iga sapi <br> 1 / 2 kg kentang <br> 2 buah wortel <br> 3 buah kentang @ <br> 5 siung bawang putih <br> 4 siung bawah merah <br> secukupnya merica <br> garam <br> penyedap rasa <br> air <br> | 500 gram iga sapi <br> 2 bh kentang <br> 2 bh wortel <br> 1 bh tomat <br> 1 batang daun bawang <br> 2 batang daun seledri <br> 6 bh bawang merah <br> 4 bh bawang putih <br> 1 bh kayu manis <br> 2 bh kapulaga <br> 1 / 2 bh pala <br> 1 bh bunga lawang <br> 1 bh kemiri <br> 15 butir merica <br> 4 gelas air putih <br> secukupnya garam <br> |
| tempe daging rolade cabai hijau    | tempe                    | 1 / 2 papan tempe <br> 1 / 4 kg daging sapi <br> 1 bungkus rolade kecil <br> 1 butir telur <br> 1 buah bawang bombay <br> 3 siung bawang putih <br> 3 buah cabai hijau <br> 1 sdt garam <br> 1 sdm gula <br> 1 sachet kaldu bubuk <br> 1 batang daun bawang <br> 1 lembar daun salam <br> 1 ruas lengkuas <br> 1 sendok teh ketumbar <br> 1 gelas air <br>         | 1 papan tempe <br> 1 / 2 kg daging sapi <br> 1 buah bawang bombay <br> 3 siung bawang putih <br> 1 sdt garam <br> 1 sdm gula pasir <br> 1 bungkus penyedap rasa <br> 1 butir telur <br> 1 batang daun bawang <br> 1 sachet saos cabai hijau <br> 1 siung bawang merah <br> 1 biji cabai rawit <br> 1 lembar daun salam <br> 1 ruas lengkuas <br> 1 tangkai daun bawang ( iris ) <br> secukupnya minyak goreng <br> | 1 papan tempe, potong dadu <br> 1 / 2 kg daging ayam, cincang halus <br> 2 buah wortel, iris korek api <br> 3 buah kentang, kupas potong dagu <br> 5 buah cabai hijau besar, buang bijinya, rajang <br> 4 siung bawang putih, geprek cincang halus ( saya pakai bawang bombay ) <br> secukupnya garam, gula, merica bubuk <br> | 1 tempe panjang  ( sesuai ukuran yg ada dipasar )  <br> 4 rolade yg sudah di goreng kemudian dipotong dadu <br> 20 buah cabai keriting hijau <br> 1 bawang merah <br> 1 bawang putih <br> 2 sdm saus tiram <br> 1 lembar daun salam <br> 1 / 2 sdt garam <br> 1 / 2 sdt gula  ( klw suka manis boleh dksh )  <br> 1 / 4 air matang gelas kecil <br> 3 sdm minyak <br> |
| pepes ikan gembung    | ikan (fish)                 | <br> 1 / 2 kg ikan gembus <br> 1 ikat kemangi <br> 1 buah tomat <br> 1 batang sereh <br> 1 ruas jari lengkuas <br> 1 lembar daun salam <br> 1 sdt garam <br> 1 sdm gula <br> 1 bungkus masako rasa ayam <br> 1 liter air <br> bumbu halus : <br> 8 siung bawang merah <br> 4 siung bawang putih <br> 5 buah cabe merah <br> 5 butir kemiri <br> 1 cm jahe <br> 1 butir kemiri ( sangrai ) <br> 1 sendok teh ketumbar <br> 1, 5 sendok teh merica <br> | 1 / 2 kg ikan gembung <br> 1 / 4 kg kelapa parut <br> 1 buah tomat <br> 1 batang serai <br> 2 lembar daun salam <br> 1 ruas lengkuas <br> 1 ikat kemangi <br> bumbu halus : <br> 10 buah cabe merah <br> 10 siung bawang merah <br> 5 siung bawang putih <br> 1 cm kunyit <br> 1 sdt ketumbar <br> 1 butir kemiri <br> 1 sdm garam <br> 1 bks penyedap rasa <br> |  1 kg ikan gembung <br> 1 / 2 kg kelapa parut <br> bumbu halus : <br> 10 siung bawang merah <br> 5 siung bawah putih <br> 3 butir kemiri <br> 2 ruas kunyit <br> 4 butir kemiri sangrai <br> secukupnya ketumbar <br> garam <br> daun pisang untuk membungkus <br> | 1 / 2 kg ikan gembung <br> 5 bh bawang merah <br> 1 bh bawang putih <br> 5 bh cabe merah <br> 1 cm jahe <br> jeruk nipis dan garam <br> kunyit dan daun kemangi <br> kelapa parut <br> daun pisang ,  lidi y utk membungkus <br> |
| pepes ayam    | ayam (chicken)                    | <br> 1 / 2 kg ayam <br> 1 ikat kemangi <br> 1 buah tomat <br> 1 batang sereh <br> 2 lembar daun salam <br> 1 ruas jari lengkuas <br> 1 lembar daun jeruk <br> 1 sdt garam <br> 1 sdm gula <br> 1 bungkus masako rasa ayam <br> bumbu halus : <br> 8 siung bawang merah <br> 4 siung bawang putih <br> 1 cm jahe <br> 1 butir kemiri <br> 1 sendok teh ketumbar <br> 1 bks masako <br> 1 liter air <br>         | 1 / 2 kg ayam <br> 1 / 4 kg kelapa parut <br> 1 buah tomat <br> 1 batang daun bawang <br> 1 ikat kemangi <br> bumbu halus : <br> 10 siung bawang merah <br> 5 siung bawang putih <br> 1 ruas kunyit <br> 1 sdt ketumbar <br> 1 butir kemiri <br> 1 cm jahe <br> 1 sdm garam <br> 1 bungkus penyedap rasa <br> 1 lembar daun salam <br> 1 btg serai <br> 1 lbr daun jeruk <br> 1 bh tomat <br> | 1 kg ayam <br> 1 / 2 kg kentang <br> 2 buah tomat <br> 5 siung bawang merah <br> 3 siung bawah putih <br> 10 buah cabe rawit <br> secukupnya garam <br> daun pisang untuk membungkus <br> | 500 gr ayam ,  cuci bersih ,  lumuri air jeruk nipis ,  sisihkan <br> secukupnya daun pisang ,  lap sampai bersih ,  jemur sebentar <br> 1 batang serai ,  potong2 <br> 1 cm jahe ,  potong2 <br> 1 cm lengkuas ,  potong2 <br> beberapa lembar daun salam <br> iris cabe merah ( boleh cabe keriting )  <br> secukupnya daun kemangi ,  siangi  ( kali ini sy ngga pake )  <br> secukupnya irisan daun bawang <br> bumbu halus :  <br> 1 siung bawang putih <br> 2 cm kunyit <br> 1 / 2 sdt lada <br> secukupnya garam <br> 5 butir kemiri sangray <br> |
| ramen babi | out of domain | nasi putih <br> 1 / 2 kg daging kambing <br> 1 buah bawang bombay <br> 2 buah tomat <br> 1 batang daun bawang <br> 1 sdm kecap manis <br> 1 sdt saos tiram <br> 1 bungkus penyedap rasa <br> 1 liter air <br> | 1 kg daging kambing <br> 1 buah wortel <br> 1 batang daun bawang <br> 1 siung bawang putih <br> 1 / 2 sdt merica <br> 1 sdt garam <br> 1 sdm gula <br> 1 butir telur <br> 1 sachet kaldu bubuk <br> 1 liter air <br> | 1 kg daging sapi / kambing, potong dadu <br> 1 / 2 kg daging kambing / sapi, rebus sampai empuk <br> 2 butir telor ayam <br> bumbu halus : <br> 5 siung bawang merah <br> 4 siung bawah putih <br> 3 butir kemiri <br> secukupnya ketumbar <br> garam <br> gula <br> penyedap rasa <br> | - |
| meong meong  | random goes brr | ik sapi <br> 1 / 2 kg daging sapi <br> bumbu halus : <br> 5 siung bawang putih <br> 1 ruas jahe <br> 1 sdm ketumbar <br> 1 sdt lada <br> 1 buah kemiri <br> 1 batang sereh <br> 1 lembar daun salam <br> 1 cm ruas lengkuas <br> 1 butir telur <br> 1 bungkus santan kara <br> secukupnya garam <br> secukupnya gula <br> secukupnya penyedap rasa <br> secukupnya air <br> | 1 kg daging kambing <br> 1 / 2 kg kentang <br> 1 buah kelapa parut <br> 1 ruas jahe <br> 1 batang serai <br> 1 lembar daun salam <br> 1 sdm gula merah <br> 1 sdt garam <br> 1 bungkus penyedap rasa <br> bumbu halus : <br> 5 siung bawang merah <br> 3 siung bawang putih <br> 1 cm kunyit <br> 1 butir kemiri <br> 1 1 / 4 sdt ketumbar <br> 1 biji kemiri <br> | 1 / 2 kg daging kambing <br> 1 ons cabe merah <br> 5 siung bawang merah @ <br> 2 siung bawah putih <br> secukupnya garam <br> | - |

There are several interesting points that we can take from these samples. In `mie goreng telur keju` ingredients, T5 and IndoGPT miss an important ingredient, which is cheese (keju). The funny part is that IndoGPT output a "(gula) sugar" as the ingredient, which is weird for me. IndoBart predicts it perfectly with a branded cheese. Although, the ground truth has few ingredients, in my opinion, the ingredients that the model output can cook the `mie goreng telur keju`. 

For `tempe daging rolade cabai hijau`, only IndoGPT can output `rolade` as a part of the ingredient. Seems like the other models don't remember about `rolade`. I explored the data and found that there are only **five foods** that contain `rolade` as its ingredient. So, it's expected for the model to not learn about it. It's interesting to see that IndoGPT can learn it. Overall, the food's ingredients are good, at least for me.

The other non-out-of-domain food is good too, although it has different ingredients as the ground truth. There are some interesting outputs such as IndoGPT outputting `gembus` instead of `gembung` and IndoGPT fails to output the quantity of the `tulang iga sapi` in the ingredient of `soup iga sapi`. From these samples, we can see that the ingredients may have different output from the target, yet, it's still the right choice. From this finding, we also think that BLEU score with a single target may not suitable to measure the quality of the recipe generator model. I think, we also need to measure with the help of experts to evaluate. There are multiple aspects to be evaluated such as the quantity of the ingredients and the correctness of the ingredients. Currently, as far as I know, there is no such automatic metric that can measure those things.

For the out-of-domain input, unfortunately, the models cannot perform well. It cannot output the `ramen babi (pork ramen)` with the mandatory ingredients such as pork and noodles. It means that they cannot do zero-shot learning to output out-of-domain prediction. Instead, they output beef or lamb as the ingredients of the food. The nonsense input, `meong meong`, also output those ingredients. This indicates that the models are biased toward foods that have those ingredients.

> Anyone know any food that has `meong meong` and `ramen babi` ingredients?  
> I'm curious XD
{: .prompt-info }

## Conclusion

![bart-model](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80){: width="800" height="200" }
_Random cat~. Photo by <a href="https://unsplash.com/@madhatterzone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Manja Vitolic</a> on <a href="https://unsplash.com/s/photos/cat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  ._

In this post, I experimented with an Indonesian recipe generator using pre-trained models. IndoBART outperforms other models based on the BLEU score. We can also conclude that fine-tuning a pre-trained model is generally better than the non-pre-trained one. It is interesting to see that it really works!

Actually, there are many things to be explored here. For example, it is interesting to see the effect of pre-trained vs the non-pre-trained one of BART, T5, and GPT. I also need to do some rigorous analysis of the trained model. Sadly, because of my limited resources, I cannot do it for now. 

In the future, I plan to write about the current progress of the seq2seq model. There are many new interesting published papers in Machine Learning conferences in 2022. I will study and write about it in my blog.

> *Feel free to ask and comment anything below. You can write in Indonesian or English language.*
{: .prompt-info }



## Cite

For anyone that want to cite my blog

```
@misc{wibowo_2022, 
title={Create Indonesian Recipe Generator by Fine-tuning T5, BART, and GPT-2  }, 
url={https://haryoa.github.io/}, 
journal={Haryo blog}, 
author={Wibowo, Haryo Akbarianto}, 
year={2022}, 
month={May}} 
```
## Sources and Explanations
*Preview Image is from [Unsplash](https://unsplash.com/photos/HlNcigvUi4Q) by Brooke Lark*

[^indobart]: IndoNLG paper: [Link](https://arxiv.org/abs/2104.08200)
[^bart]: BART paper: [Link](https://arxiv.org/abs/1910.13461)
[^t5]: T5 paper: [Link](https://arxiv.org/abs/1910.10683)
[^GPT]: GPT-2 Paper: [Link](https://d4mucfpksywv.cloudfront.net/better-language-models/language-models.pdf)
[^hf-tutor]: Several tutorials from huggingface: [Link](https://huggingface.co/transformers/v3.0.2/notebooks.html)
[^pl-lit]: [Pytorch Lightning Site](https://www.pytorchlightning.ai/)
[^indot5]: [Indonesian T5](https://huggingface.co/Wikidepia/IndoT5-base)
