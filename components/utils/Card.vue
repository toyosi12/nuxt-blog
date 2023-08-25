<template>
    <NuxtLink to="slug_here">
        <div :class="['card', isHero === true ? 'card--hero' : '']">
            <div class="card__image-container">
                <img class="card__image" src="~/assets/images/sample-img.jpeg" alt="TODO" />
            </div>
            <div class="card__content">
                <div class="card__content-top">
                    <div class="card__content-category">Front-end</div>
                    <div class="card__content-separator"></div>
                    <div class="card__content-date">1 Month Ago</div>
                </div>
                <div class="card__content-middle">
                    <h4 v-if="isHero === true">Css Grid</h4>
                    <h5 v-else>Css Grid</h5>
                    <p>The CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.</p>
                </div>
                <div class="card__content-bottom">
                    <div class="card__content-reading-time">
                        <p>12 Min Read</p>
                    </div>
                    <div class="card__content-full">
                        <p>Read Full</p>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
    const { isHero } = defineProps(['isHero']);
</script>

<style lang="scss" scoped>
.card {
    @include flex-box(column);
    @include flex-box(column, flex-start, flex-start);
    @include flex-gap(1.2rem);
    padding: 1rem;
    border-radius: 0.5rem;
    border: solid 0.1rem $gray-10;
    transition: transform 0.2s, box-shadow 0.2s;
    &__image-container{
        width: 100%;
        height: 20rem;
    }
    &__image{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
    }
    &__content{
        width: 100%;
        @include flex-box(column, flex-start, flex-start);
        @include flex-gap(1.2rem);
    }
    &__content-top, &__content-date {
        font-size: 1.2rem;
        font-weight: 500;
    }
    &__content-top {
        @include flex-box(row, flex-start);
        @include flex-gap(0.5rem);
    }
    &__content-category{
        color: $black-30;
    }
    &__content-date {
        color: $black-20;
    }
    &__content-middle{
        p{
            @include text-regular();
            color: $black-20;
        }
    }
    &__content-reading-time{
        p{
            @include text-small($black-20);
        }
    }
    &__content-separator{
        @include separator()
    }
    &__content-bottom{
        @include flex-box(row, space-between);
        width: 100%;
        align-self: baseline;
    }
    &__content-full{
        text-align: right;
        p{
            @include text-small-bold($primary-blue);
        }
    }
    h5{
        color: $black-10;
    }
    &:hover{
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
}


@media screen and (min-width: $breakpoint-sm) {
    .card{
        &--hero{
            padding: 0.8rem;
            height: 28rem;
            @include flex-box(row, flex-start, flex-start);
            .card__image-container{
                height: 100%;
                .card__image{
                    border-radius: 0;
                }
            }
            .card__content{
                @include flex-box(column, flex-start, flex-start);
                height: 100%;
            }
            .card__content-bottom{
                margin-top: auto
            }
            h4{
                font-weight: 900;
            }

        }

    }
}
</style>