package com.pashto.poetry.admin

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.pashto.poetry.admin.databinding.ItemAdminPostBinding

class AdminPostAdapter(
    private val context: Context,
    private var posts: List<AdminPoetryPost>,
    private val onDeleteClicked: (AdminPoetryPost) -> Unit
) : RecyclerView.Adapter<AdminPostAdapter.AdminPostViewHolder>() {

    fun updateData(newPosts: List<AdminPoetryPost>) {
        posts = newPosts
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AdminPostViewHolder {
        val binding = ItemAdminPostBinding.inflate(LayoutInflater.from(context), parent, false)
        return AdminPostViewHolder(binding)
    }

    override fun onBindViewHolder(holder: AdminPostViewHolder, position: Int) {
        val post = posts[position]
        holder.bind(post)
    }

    override fun getItemCount(): Int = posts.size

    inner class AdminPostViewHolder(private val binding: ItemAdminPostBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(post: AdminPoetryPost) {
            binding.tvAdminPostPoet.text = post.authorName
            binding.tvAdminPostText.text = post.text
            binding.tvAdminPostDate.text = post.formattedDate

            // Set media type label
            binding.tvAdminPostType.text = when (post.mediaType) {
                "VIDEO" -> "ویډیو کلام"
                "PHOTO" -> "ډیزاین شوی عکس"
                else -> "متني غزل"
            }

            // Delete click
            binding.btnAdminDelete.setOnClickListener {
                onDeleteClicked(post)
            }
        }
    }
}
