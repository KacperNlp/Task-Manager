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
            <UCard>
              <p>{{ task?.description }}</p>
            </UCard>
          </section>
          <div class="mt-6 mb-4">
            <UForm
              :state="newComment"
              class="space-y-4 w-full max-w-[650px] md:min-w-96"
              action="POST"
              @submit="addCommnet"
            >
              <UFormGroup label="Add comment" name="comment">
                <UTextarea
                  v-model="newComment.value"
                  :required="true"
                  type="text"
                />
              </UFormGroup>
              <UButton type="submit">Add</UButton>
            </UForm>
          </div>
          <section
            class="mt-8 p-2 pt-4 border-t border-t-zinc-600 h-[300px] overflow-y-scroll"
          >
            <AppCommentsList :comments="comments" />
          </section>
        </section>
      </div>
    </UCard>
  </UCard>
</template>

<script lang="ts" setup>
import type { Task, Comment } from "~/types/types";

interface Props {
  taskId: string | null;
}

defineEmits(["closeMoadal"]);

const newComment = reactive({
  value: "",
});

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
