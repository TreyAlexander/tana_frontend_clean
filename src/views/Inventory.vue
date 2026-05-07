<template>
  <div class="top-bar">
  <button class="add-btn" @click="openAddForm">Add Inventory</button>
  <button class="user-btn" @click="goToProfile">User</button>
</div>

  <div class="inventory-page">
    <div class="inventory-container">

        <h2>Inventory</h2>

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Category</th>
              <th scope="col">Need Restock?</th>
              <th scope="col">Manage</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in inventory" :key="item.pk">
              <td>{{ item.item_name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ getCategoryName(item.category) }}</td>
              <td>{{ item.need_restock ? "Yes" : "No" }}</td>
              <td>
                <button @click="openEditForm(item)">Manage</button>
              </td>
              <td>
                <button @click="deleteInventory(item)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="inventory.length === 0">No inventory items found.</div>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-box">
        <h3>{{ isAdding ? 'Add New Inventory Item' : 'Edit Inventory Item' }}</h3>

        <label>Item</label>
        <input v-model="editForm.item_name" type="text" />

        <label>Price per Unit</label>
        <input v-model="editForm.price_per_unit" type="number" />

        <label>Quantity</label>
        <input v-model="editForm.quantity" type="number" />

        <label>Category</label>
        <select v-model.number="editForm.category">
          <option disabled value="">Select a category</option>
          <option
            v-for="category in categories"
            :key="category.pk"
            :value="category.pk"
          >
            {{ category.category_name || category.name }}
         </option>
        </select>

        <label>Need Restock</label>
        <select v-model="editForm.need_restock">
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>

        <label>Restaurant</label>
        <input v-model="editForm.restaurant" type="number" />

        <div class="modal-actions">
          <button @click="submitEdit">Save</button>
          <button @click="closeEditForm">Cancel</button>
        </div>
      </div>
    </div>
</template>

<script>
import {
  getInventory,
  getCategories,
  createInventory,
  updateInventory,
  deleteInventory as deleteInventoryAPI,
} from "../services/api";

export default {
  name: "Inventory",

  data() {
    return {
      inventory: [],
      categories: [],
      showEditModal: false,
      isAdding: false,
      editForm: {
        pk: null,
        item_name: "",
        price_per_unit: "",
        quantity: "",
        category: "",
        need_restock: false,
        restaurant: 1,
      },
    };
  },

  mounted() {
    this.getInventory();
    this.getCategories();
  },

  methods: {
    openAddForm() {
      this.editForm = {
        pk: null,
        item_name: "",
        price_per_unit: "",
        quantity: "",
        category: "",
        need_restock: false,
        restaurant: "",
      };
      this.isAdding = true;
      this.showEditModal = true;
    },

    goToProfile() {
      this.$router.push('/profile')
    },

    async getInventory() {
      try {
        const result = await getInventory();
        console.log("inventory result:", result);
        this.inventory = await getInventory();
      } catch (error) {
        console.error("Error retrieving inventory:", error);
      }
    },

    getCategoryName(categoryPk) {
      const category = this.categories.find(
        category => Number(category.pk) === Number(categoryPk)
      );

      return category ? category.category_name || category.name : categoryPk;
    },

    openEditForm(item) {
      this.editForm = {
        pk: item.pk,
        restaurant: item.restaurant,
        item_name: item.item_name,
        price_per_unit: item.price_per_unit,
        quantity: item.quantity,
        category: item.category,
        need_restock: item.need_restock,
        restaurant: item.restaurant,
      };
      this.isAdding = false;
      this.showEditModal = true;
    },

    closeEditForm() {
      this.showEditModal = false;
      this.isAdding = false;
    },

    async submitEdit() {
      try {
        if (this.isAdding) {
          await createInventory(this.editForm);
        } else {
          await updateInventory(this.editForm.pk, this.editForm);
        }

        this.getInventory();
        this.closeEditForm();
      } catch (error) {
        console.error("Error updating inventory:", error);
        alert("Failed to update inventory item");
      }
    },

    async getCategories() {
    try {
      this.categories = await getCategories();
      console.log("categories result:", this.categories);
      } catch (error) {
      console.error("Error retrieving categories:", error);
      }
    },

    async deleteInventory(item) {
      if (confirm("Do you really want to delete this item?")) {
        try {
          await deleteInventoryAPI(item.pk);
          this.getInventory();
        } catch (error) {
          console.error("Error deleting inventory:", error);
          alert("Failed to delete inventory item");
        }
      }
    },
  },
};
</script>
<style scoped>
h2, h3 {
  color: #002872;
  margin-bottom: 20px;
  text-align: center;
}

table {
  width: 100%;
}

th {
  background-color: #5f82c3;
  color: white;
}

button {
  background-color: #5f82c3;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.modal-box {
  background: white;
  padding: 25px;
  width: 400px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-box h3 {
  text-align: center;
  color: #5f82c3;
}

.modal-box input,
.modal-box select {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.add-btn {
  background-color: #002872;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}

.user-btn {
  background-color: #002872;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
