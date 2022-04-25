---
author: haryoaw
title: Indonesia Recipe Gen
date: 2022-04-15 15:00:00 +0700
categories: [announcement]
tags: [announcement]
pin: false
toc: true
---


!['test'](https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80){: width="800" height="400" }
_From [Unsplash](https://unsplash.com/photos/HlNcigvUi4Q) by Brooke Lark_
{: width="972" height="589" }

Hello Everyone! Welcome to my first technical post on my personal blog! In this post, I will write about 
one of my fun projects, Indonesia Recipe Generator. I will write technical stuff here.  This is the continuation of my previous [medium post](https://pub.towardsai.net/recibrew-find-out-the-foods-ingredients-dbc2a4e37383) with more modern approach.


## Repository and Demo

I will provide the best model and also the code to train it.

Feel free to try and download it.

- Huggingface Space: xxx
- Huggingface Model:
- Repository: 

## Introduction

In the past, I created an Indonesia recipe generator in my [medium post](https://pub.towardsai.net/recibrew-find-out-the-foods-ingredients-dbc2a4e37383) by using a seq2seq Deep Learning approach such as Gated Recurrent Unit (GRU) and Transformers. The model was raw and not pre-trained. So, it didn't have any prior knowledge to use in the training process. 

One of the improvements that can increase the quality of the model that I mentioned in my previous blog is using a pre-trained model. Many state-of-the-art research works implement it to improve the quality of the model from the non-pre-trained one. Moreover, currently, it's the era of the pre-trained model in Deep Learning. Nowadays, many pre-trained models appear and have outstanding results when the model is trained again (we call it `fine-tune`) on the target dataset. Therefore, it's intriguing to try it for my recipe generator project. 

In this experiment, I will use off-the-shelf publicly available pre-trained models. Since the data is in the Indonesian language, I need to use models pre-trained with the Indonesian data. They also need to handle sequence generation problems since the problem that I want to tackle is a text generation problem. I searched and only found T5, BART, and GPT models. Thus, I decided to experiment by using these models.

## Data, Preprocessing, Exploration Data Analysis

Since this is the continuation of my previous project, I use the same data that I used previously. Feel free to read more detail about it through my medium post below (click the image).

[!['test'](/assets/img/posts/id-recipe-generator/1.jpg){: width="800" height="200" }](https://pub.towardsai.net/recibrew-find-out-the-foods-ingredients-dbc2a4e37383)
_Click the image~_


## Method

In this section, I will describe the models that I've tried and mentioned above. All of the models that I used are transformer-based model. I will briefly descibe about them.

> In the future, I plan to create a post about in-depth details about current popular pre-trained model 
> I will try to make a distinction about each of them, so it will be easier for you to understand them. 
{: .prompt-info }

### Bart

BART is a transformer-based model that is pretrained through learning a corrupted input. It has a encoder-decoder architecture like Transformer with a few modification such as the replacement of the activation function.  There are several corrupted scenario that the author of the BART tried. The released final system is a model which is pretrained through *sentence shuffling* and *token masking*. The idea is to make BART to learn perturbation and have the capability on doing causal language modelling. To apply it to the system, I fine-tuned the model to the data.  Here is the illustration of how pre-trained BART was built.

In this experiment, I used IndoBART as the pre-trained model, which is released in this paper. The model is pre-trained through Indo4B dataset, Common Crawl, and Wikipedia. The data has Indonesian, Sundanese, and Javanese language. It is available in the Huggingface model.

### T5

T5 is also a transformer-based model that is pretrained with a corrupted input. T5 is pretrained by doing *token masking*. different from the BART that use the data for causal language model training, T5 uses the training data as a seq2seq problems. The data may contain Translation, Question Answering, and Classification problem. The model is fed thorugh learning those tasks with the addition of learning a corrupted input. Here is the illustration of how the model is pre-trained.

I used a T5 model which is available in the huggingface. It is pre-trained by using mC4 dataset.

### GPT

GPT is an auto-regressive pre-trained model that is pre-trained through causal language modelling that has no perturbation in the input (unlike BART and T5). Then, the pre-trained model is fine-tuned to our data. I used IndoGPT model that is also released together with IndoBART. The model is also pre-trained with the same data as BART.

Since the model is not encoder-decoder architecture, we need to reshape our data and make it as a generation problem. 

## Setup

I will split this section into code technical setup, model setup, and hyperparameter setup to make reader comfortable to navigate.

### Code Technical Setup

To make the training script, I used Pytorch as the deep learning framework. I wrap them with Pytorch Lightning. I used
the implementation of Model Checkpoint, Early Stopping, 16-bit Precision from the Pytorch Lightning. 

For metric calculation, I used BLEU from the `sacrebleu` python package.

To see more detail, you can visit my repository that I have stated above.

### Model Setup

I applied several modification to the input of the model. For the architecture, I used off-the-shelf implementation that
Huggingface provided.

For **GPT**, since it needs one input, I concated the food name and recipe into an input with a special token.

```
Input: <FOOD> >>> <INGREDIENTS>
Output: Shift the input (e.g.: Input: `Apple Fruit end_of_token`, Output: `Fruit end_of_token`)
```

**T5** has seq2seq architecture, so I did small modification to the input. From what I've read, T5 is pre-trained with 'prompting' style of input. For example:
`input: summarize: <ARTICLE>`. So, I follow it to and change the data to become like that. Below is how I present the input-output of the model

```
Input: resep: <FOOD>
Output: <INGREDIENTS>
```

I didn't do any change in the BART model, so I provide the input and the output as is.

```
Input: <FOOD>
Output: <INGREDIENTS>
```

### Hyperparameter Setup

- See repository
- I use Pytorch Lightning with Transformers as the backbone of the model to train the model
- For GPT, Generation Model, I added FOOD >>> INGREDIENTS format and train as language modeling
- For T5, I use seq2seq with addition of aditional token.
- For Bart, use normally
- Use Adam as optimizer, learning rate 1e-4, 1e-5, or 5e-5
- Early stoppinngn based on validation loss
- Get the model that has low validation loss
- Using greedy as decoder

## Experiment REsults

BART: 27.03
T5: 19.21
GPT: 9.98

- With the setup, BART dominates a lot
- Interestingly, GPT got far down. Even far down than the non-pretrained one. I need to investigate more about this
- BART and T5 > transformerr vanilla, indicate pre-trained may help on increasing the quality
- Sadly can't out of domain.

## Analysis

- Here, I 'll provide several food sample across different basic ingredients.


## Conclustion

- I do experiment, BART > everything
- Pretrained helps a lot
- I'll provide another post in depth analysis, for other things . Plan such as decoder and pretrained model, 