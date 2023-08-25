<template>
    <article class="article">
        <section class="article__description">
            <div class="article__writer">
                <p>By Ryan Jackson</p>
            </div>
            <div class="article_date">
                <p>2 Month Ago</p>
            </div>
        </section>
        <section class="article__content">
            <h3>Optimizing CSS for faster page loads</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc non blandit massa enim. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Tellus elementum sagittis vitae et leo duis ut diam. Eget nullam non nisi est sit amet. Dignissim suspendisse in est ante in nibh mauris. Nec feugiat in fermentum posuere urna. Diam in arcu cursus euismod quis viverra. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Sed elementum tempus egestas sed sed risus pretium quam vulputate. Lacus sed turpis tincidunt id aliquet risus feugiat in ante. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Morbi tincidunt augue interdum velit euismod in. Accumsan lacus vel facilisis volutpat est velit egestas dui. Erat pellentesque adipiscing commodo elit at imperdiet. Quis risus sed vulputate odio ut. Nulla aliquet enim tortor at auctor urna.</p>
            <div class="article__image-container">
                <img class="article__image" src="~/assets/images/sample-img.jpeg" alt="TODO" />
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc non blandit massa enim. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Tellus elementum sagittis vitae et leo duis ut diam. Eget nullam non nisi est sit amet. Dignissim suspendisse in est ante in nibh mauris. Nec feugiat in fermentum posuere urna. Diam in arcu cursus euismod quis viverra. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Sed elementum tempus egestas sed sed risus pretium quam vulputate. Lacus sed turpis tincidunt id aliquet risus feugiat in ante. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Morbi tincidunt augue interdum velit euismod in. Accumsan lacus vel facilisis volutpat est velit egestas dui. Erat pellentesque adipiscing commodo elit at imperdiet. Quis risus sed vulputate odio ut. Nulla aliquet enim tortor at auctor urna.</p>
        </section>
    </article>
    <aside>
        <h4>More Articles</h4>
        <Articles />
    </aside>
</template>


<style lang="scss" scoped>
    .article{
        @include flex-box(column, flex-start, flex-start);
        @include flex-gap(2rem);
        width: 80%;
        margin: 5rem auto;
        &__description{
            @include flex-box(row, flex-start, flex-start)
        }
        &__writer{
            p{
                @include text-small($black-30);
            }
        }
        &__content{
            @include flex-box(column, flex-start, flex-start);
            h3{
                @include text-lg-bolder($black-10);
            }
            p{
                @include text-regular($black-20);
            }
        }
        &__image-container{
            width: 100%;
            @include flex-box(row, center, center);
            margin: 3rem 0;
        }
        &__image{
            width: 60%;
            height: auto;
        }
    }
</style>