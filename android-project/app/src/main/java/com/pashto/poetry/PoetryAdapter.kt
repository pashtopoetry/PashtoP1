package com.pashto.poetry

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Color
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
    private val likedPosts = mutableSetOf<String>()
    private val favoritedPosts = mutableSetOf<String>()

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
            val postIdStr = post.id.toString()

            // Bind Poet Name & Metadata
            binding.tvPoet.text = post.authorName
            binding.tvCategory.text = if (post.mediaType == "VIDEO") "ویډیو کلام" else if (post.photoUrl != null) "ډیزاین شوی عکس" else "غزل"
            binding.tvDate.text = post.formattedDate
            binding.tvViews.text = post.viewsCount ?: "1.5K"

            // Show Verified checkmark based on poet name
            val isVerified = post.authorName.contains("حمزه") ||
                             post.authorName.contains("غني") ||
                             post.authorName.contains("رحمان") ||
                             post.authorName.contains("خوشحال") ||
                             post.authorName.contains("کاروان") ||
                             post.authorName.contains("تراب") ||
                             post.authorName.contains("پښتو") ||
                             post.authorName.contains("Poetry")
            binding.ivVerifiedBadge.visibility = if (isVerified) View.VISIBLE else View.GONE

            // Load Poet Avatar with beautiful Fallbacks matching the exact list in UI
            val avatarUrl = when {
                post.authorName.contains("حمزه") -> "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                post.authorName.contains("غني") -> "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                post.authorName.contains("رحمان") -> "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
                post.authorName.contains("خوشحال") -> "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
                post.authorName.contains("کاروان") -> "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
                post.authorName.contains("تراب") -> "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
                else -> post.authorAvatarUrl ?: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80"
            }

            Glide.with(context)
                .load(avatarUrl)
                .placeholder(R.drawable.ic_launcher)
                .error(R.drawable.ic_launcher)
                .into(binding.ivPoetAvatar)

            // Bind Poetry text body (Pashto, serif)
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
                binding.cardVideoPlayer.visibility = View.VISIBLE
                
                // Release old player for this position if any
                releasePlayer(position)

                val player = ExoPlayer.Builder(context).build()
                binding.playerView.player = player
                
                val mediaItem = MediaItem.fromUri(Uri.parse(post.videoUrl))
                player.setMediaItem(mediaItem)
                player.prepare()
                
                playersMap[position] = player
            } else {
                binding.cardVideoPlayer.visibility = View.GONE
                binding.playerView.player = null
            }

            // --- Interactive Button Logic ---

            // 1. Like Button
            val isLiked = likedPosts.contains(postIdStr)
            val baseLikesCount = (post.timestamp % 80 + 15).toInt()
            val finalLikes = if (isLiked) baseLikesCount + 1 else baseLikesCount
            binding.btnLike.text = finalLikes.toString()

            if (isLiked) {
                binding.btnLike.iconTint = ColorStateList.valueOf(Color.parseColor("#FF1744"))
                binding.btnLike.setTextColor(Color.parseColor("#FF1744"))
            } else {
                binding.btnLike.iconTint = ColorStateList.valueOf(Color.parseColor("#475569"))
                binding.btnLike.setTextColor(Color.parseColor("#475569"))
            }

            binding.btnLike.setOnClickListener {
                if (likedPosts.contains(postIdStr)) {
                    likedPosts.remove(postIdStr)
                } else {
                    likedPosts.add(postIdStr)
                }
                notifyItemChanged(position)
            }

            // 2. Favorite Button
            val isFavorited = favoritedPosts.contains(postIdStr)
            binding.btnFavorite.text = if (isFavorited) "خوندي شو" else "خوندي"

            if (isFavorited) {
                binding.btnFavorite.iconTint = ColorStateList.valueOf(Color.parseColor("#D97706"))
                binding.btnFavorite.setTextColor(Color.parseColor("#D97706"))
            } else {
                binding.btnFavorite.iconTint = ColorStateList.valueOf(Color.parseColor("#475569"))
                binding.btnFavorite.setTextColor(Color.parseColor("#475569"))
            }

            binding.btnFavorite.setOnClickListener {
                if (favoritedPosts.contains(postIdStr)) {
                    favoritedPosts.remove(postIdStr)
                } else {
                    favoritedPosts.add(postIdStr)
                }
                notifyItemChanged(position)
            }

            // 3. WhatsApp Share Button
            binding.btnWhatsApp.setOnClickListener {
                val shareText = "*${post.authorName}*\n\n${post.text}\n\n_د پښتو شعرونو ايپ له لارې_"
                val whatsappIntent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, shareText)
                    `package` = "com.whatsapp"
                }
                try {
                    context.startActivity(whatsappIntent)
                } catch (ex: Exception) {
                    // WhatsApp not installed, fallback to general share intent
                    val generalIntent = Intent(Intent.ACTION_SEND).apply {
                        type = "text/plain"
                        putExtra(Intent.EXTRA_TEXT, shareText)
                    }
                    context.startActivity(Intent.createChooser(generalIntent, context.getString(R.string.share_text)))
                }
            }

            // 4. Copy Action
            binding.btnCopy.setOnClickListener {
                val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                val clip = ClipData.newPlainText("Pashto Poetry", post.text)
                clipboard.setPrimaryClip(clip)
                Toast.makeText(context, context.getString(R.string.copied_toast), Toast.LENGTH_SHORT).show()
            }

            // 5. General Share Action
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
