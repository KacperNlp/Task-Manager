<template>
  <UCard class="h-full w-full">
    <template #header>
      <div class="flex items-center justify-between">
        <h2
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Task details
        </h2>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="$emit('closeMoadal')"
        />
      </div>
    </template>

    <UCard class="w-full h-full max-w-5xl mx-auto mt-auto">
      <div>
        <section class="h-full max-h-[80vh] pr-4 md:pr-8">
          <section>
            <h3 class="text-2xl font-bold mb-6">{{ task?.title }}</h3>
            <strong class="block mb-4">Opis</strong>
            <div class="p-2 md:p-4 border border-gray-300 rounded-md">
              <p>{{ task?.description }}</p>
            </div>
          </section>
          <div class="mt-6 mb-4">
            <form action="POST" class="flex flex-col gap-2">
              <label for="comment" class="text-xs text-gray-700"
                >Dodaj komentarz:</label
              >
              <textarea
                v-model="newComment"
                name="comment"
                id="comment"
                class="w-full p-4 bg-gray-100"
              ></textarea>
              <AppButton @click="addCommnet" class="text-sm w-max"
                >Dodaj komentarz</AppButton
              >
            </form>
          </div>
          <section>
            <AppCommentsList :comments="comments" />
          </section>
        </section>
      </div>
    </UCard>
  </UCard>
</template>

<script lang="ts" setup>
import { data } from "autoprefixer";
import type { Task, Comment } from "~/types/types";

interface Props {
  taskId: string;
}

defineEmits(["closeMoadal"]);

const newComment = ref<string>("");
const task = ref<Task | null>(null);
const comments = ref<Comment[] | null>(null);

const props = defineProps<Props>();

onMounted(async () => {
  try {
    const [resTask, resComments] = await Promise.all([
      $fetch<Task>(`http://localhost:8080/tasks/${props.taskId}`, {
        credentials: "include",
      }),
      $fetch<Comment[]>(`http://localhost:8080/comments/all/${props.taskId}`, {
        credentials: "include",
      }),
    ]);

    task.value = resTask;
    comments.value = resComments.reverse();
  } catch (error) {
    console.error(error);
  }
});

async function addCommnet() {
  try {
    await $fetch(`http://localhost:8080/comments/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newComment.value,
        taskId: props.taskId,
        date: new Date(),
      }),
      credentials: "include",
    });

    const res = await $fetch<Comment[]>(
      `http://localhost:8080/comments/all/${props.taskId}`,
      {
        credentials: "include",
      }
    );

    comments.value = res.reverse();
  } catch (error) {
    console.error(error);
  }
}
</script>
