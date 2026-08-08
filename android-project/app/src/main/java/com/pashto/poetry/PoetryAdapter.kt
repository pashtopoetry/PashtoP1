package com.pashto.poetry

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.pashto.poetry.databinding.ItemPoetryBinding

class PoetryAdapter(
    private val context: Context,
    private var posts: List<PoetryPost>
) : RecyclerView.Adapter<PoetryAdapter.PoetryViewHolder>() {

    private val playersMap = mutableMapOf<Int, ExoPlayer>()

    fun updateData(newPosts: List<PoetryPost>) {
        posts = newPosts
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PoetryViewHolder {
        val binding = ItemPoetryBinding.inflate(LayoutInflater.from(context), parent, false)
        return PoetryViewHolder(binding)
    }

    override fun onBindViewHolder(holder: PoetryViewHolder, position: Int) {
        val post = posts[position]
        holder.bind(post, position)
    }

    override fun getItemCount(): Int = posts.size

    override fun onViewRecycled(holder: PoetryViewHolder) {
        super.onViewRecycled(holder)
        releasePlayer(holder.bindingAdapterPosition)
    }

    private fun releasePlayer(position: Int) {
        playersMap[position]?.let { player ->
            player.release()
            playersMap.remove(position)
        }
    }

    fun releaseAllPlayers() {
        playersMap.forEach { (_, player) ->
            player.release()
        }
        playersMap.clear()
    }

    inner class PoetryViewHolder(val binding: ItemPoetryBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(post: PoetryPost, position: Int) {
            // Bind Header
            binding.tvPoet.text = post.authorName
            binding.tvCategory.text = post.mediaType
            binding.tvDate.text = post.formattedDate

            // Bind Poetry Text
            binding.tvPoetryText.text = post.text

            // Image Attachment
            if (!post.photoUrl.isNullOrEmpty() && post.videoUrl.isNullOrEmpty()) {
                binding.ivAttachment.visibility = View.VISIBLE
                Glide.with(context)
                    .load(post.photoUrl)
                    .into(binding.ivAttachment)
            } else {
                binding.ivAttachment.visibility = View.GONE
            }

            // Video Attachment (ExoPlayer)
            if (!post.videoUrl.isNullOrEmpty()) {
                binding.playerView.visibility = View.VISIBLE
                
                // Release old player for this position if any
                releasePlayer(position)

                val player = ExoPlayer.Builder(context).build()
                binding.playerView.player = player
                
                val mediaItem = MediaItem.fromUri(Uri.parse(post.videoUrl))
                player.setMediaItem(mediaItem)
                player.prepare()
                
                playersMap[position] = player
            } else {
                binding.playerView.visibility = View.GONE
                binding.playerView.player = null
            }

            // Copy Action
            binding.btnCopy.setOnClickListener {
                val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                val clip = ClipData.newPlainText("Pashto Poetry", post.text)
                clipboard.setPrimaryClip(clip)
                Toast.makeText(context, context.getString(R.string.copied_toast), Toast.LENGTH_SHORT).show()
            }

            // Share Action
            binding.btnShare.setOnClickListener {
                val shareIntent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, "${post.authorName}\n\n${post.text}")
                }
                context.startActivity(Intent.createChooser(shareIntent, context.getString(R.string.share_text)))
            }
        }
    }
}
