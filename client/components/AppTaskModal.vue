<template>
  <UCard class="w-full max-w-[750px]">
    <div class="w-full max-w-[750px] md:min-w-[650px] max-h-[80vh]">
      <section class="overflow-y-scroll h-full max-h-[80vh] pr-4 md:pr-8">
        <section>
          <h2 class="text-2xl font-bold mb-6">{{ task?.title }}</h2>
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
</template>

<script lang="ts" setup>
import { data } from "autoprefixer";
import type { Task, Comment } from "~/types/types";

interface Props {
  taskId: string;
}

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
