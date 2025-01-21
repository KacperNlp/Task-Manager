<template>
  <AppCard class="shadow-lg">
    <div class="w-full max-w-[750px] md:min-w-[650px] max-h-[80vh]">
      <section class="overflow-y-scroll h-full max-h-[80vh] pr-4 md:pr-8">
        <section>
          <h2 class="text-2xl font-bold mb-6">{{ task?.title }}</h2>
          <strong class="block mb-4">Opis</strong>
          <div class="p-2 md:p-4 border border-gray-300 rounded-md">
            <p>{{ task?.description }}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
              accusamus harum iure quibusdam nobis nulla, earum ipsam
              repudiandae quos quo hic iste repellat modi dolorum temporibus
              asperiores voluptatibus rerum quisquam tempore nihil. Accusamus
              ullam blanditiis qui possimus numquam repellat corporis quis
              officia, officiis quos velit obcaecati! Beatae laboriosam facere
              voluptatum odio tenetur. Obcaecati necessitatibus voluptatibus
              architecto perspiciatis facilis, rerum odit expedita perferendis
              corrupti possimus, quidem cum. Obcaecati quae, quidem nemo commodi
              nostrum possimus, pariatur ea sunt, ad fugit necessitatibus
              distinctio! Quae suscipit possimus nisi temporibus perspiciatis
              ipsam dolore necessitatibus, quos natus error consequuntur, ut
              officiis itaque! Quis rerum reiciendis minima libero hic voluptas
              illum delectus praesentium magnam nihil animi velit obcaecati ut
              quam pariatur itaque laborum vel provident quasi, nobis
              accusantium dolores aperiam. Nesciunt obcaecati, aut ex eaque
              saepe consequuntur placeat! Enim voluptas facere necessitatibus
              placeat laboriosam, ipsa illo odio, asperiores ducimus voluptate
              adipisci. Tempora incidunt praesentium quia molestiae iusto a
              optio assumenda, esse laboriosam necessitatibus aspernatur
              distinctio labore nostrum iste sit sunt sapiente aut ducimus ea?
              Qui iste non quaerat praesentium, vero, sequi optio laboriosam
              suscipit perspiciatis eius ducimus deserunt adipisci ad repellat
              molestiae in sed magni debitis. Nemo, quas culpa molestiae ab
              tempora eius. Illo minus esse tenetur expedita voluptas soluta
              quasi, accusantium necessitatibus nesciunt, voluptates dolor
              aspernatur iure eius nam. Autem alias ad, doloremque quidem ab
              ipsam nesciunt similique repellendus ex libero odit nulla beatae,
              deserunt perferendis eum molestias fugit nam tempore aut,
              temporibus minus. Distinctio suscipit iure, voluptate fugit
              numquam omnis veritatis, officia repellendus temporibus nostrum
              hic nisi repudiandae molestias placeat eos, aspernatur iste. Ad
              nobis voluptas consectetur deleniti nulla quidem ipsum! Voluptates
              cupiditate nisi voluptas illo accusamus assumenda aliquid corrupti
              deserunt ab, consequuntur dolores. Ipsa, sint! Voluptas ipsam
              cumque reprehenderit totam accusantium eligendi modi? Dolorum,
              expedita vel sint quibusdam ipsam tempora iste et aspernatur sit.
            </p>
          </div>
        </section>
        <div class="mt-6 mb-4">
          <form action="POST" class="flex flex-col gap-2">
            <label for="comment" class="text-xs text-gray-700"
              >Dodaj komentarz:</label
            >
            <textarea
              name="comment"
              id="comment"
              class="w-full p-4 bg-gray-100"
            ></textarea>
          </form>
        </div>
        <section>
          <AppCommentsList :comments="comments" />
        </section>
      </section>
    </div>
  </AppCard>
</template>

<script lang="ts" setup>
import type { Task, Comment } from "~/types/types";

interface Props {
  taskId: string;
}

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
    comments.value = resComments;
  } catch (error) {
    console.error(error);
  }
});
</script>
